// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Internal Libraries
import {AlexandriaData} from "./AlexandriaData.sol";
import {Book} from "./libraries/AlexandriaDataLibrary.sol";

// Errors
error NotManager();
error IdsNotEqualPagecount(uint16 pageCount, uint256 length);
error IdOverflow(uint256 nextPageIDToUse, uint16 pageCount);
error IncorrectID(uint256 id, uint256 nextPageIDToUse);
error BookAlreadyProposed(bytes32 bookHash);
error ProposalNoExist(uint32 timestamp);
error DisputeNoExist(uint32 timestamp);
error ProposalAlreadyDisputed();
error DisputeTimeExpired(uint32 bookTimestamp, uint32 defaultDisputePeriod);
error TransferFailed();
error InsufficientBond(uint256 bondAmount, uint256 requiredAmount);
error BookAlreadyReserved(bytes32 bookHash);
error ReservationError(string message);

/// @title Alexandria Oracle Contract
/// @author B0gs
/// @notice This contract handles the oracle functionalities for Alexandria.
/// @dev This contract interacts with the AlexandriaData contract.
contract AlexandriaOracle {
    /// ========================
    /// ==== State Structs =====
    /// ========================

    struct Reservation {
        bytes32 bookHash;
        address reserver;
        uint256 timestamp;
        uint256 startPage;
        uint256 endPage;
        uint256 bookBondAmount;
        uint16 pageCount;
        string bookURL;
    }

    // ========================
    // ==== State Variables ===
    // ========================

    AlexandriaData public data;
    uint256 public reservationDuration = 1 hours;
    mapping(uint256 => Reservation) public reservations;
    mapping(bytes32 => bool) public isReserved;
    mapping(address => uint256) public hasReserved;
    uint256 public nextReservationId = 1;
    uint256 public nextBookId = 1;
    uint256 public oldestReservationId = 0;
    uint256 public nextPageIDToUse = 1;
    address public manager;

    /// ======================
    /// ======= Events =======
    /// ======================

    event ReservationMade(
        bytes32 indexed bookHash,
        address indexed reserver,
        uint256 reservationId,
        uint256 timestamp,
        uint256 startPage,
        uint256 endPage,
        uint256 bookBondAmount,
        uint16 pageCount,
        string bookURL
    );

    event BookProposed(
        bytes32 indexed bookHash,
        uint256 bookId,
        uint256 startPage,
        uint256 endPage,
        uint256 bookBondAmount,
        address indexed proposer,
        address indexed disputer,
        uint32 timestamp,
        uint16 pageCount,
        string carURI,
        string bookURL
    );

    event BookDisputed(
        bytes32 indexed bookHash,
        uint256 bookId,
        uint256 startPage,
        uint256 endPage,
        uint256 bookBondAmount,
        address indexed proposer,
        address indexed disputer,
        uint32 timestamp,
        uint16 pageCount,
        string carURI,
        string bookURL
    );

    event BookAddedToMintQueue(uint256 indexed bookId);
    event ReservationExpired(uint256 indexed reservationId);

    /// ====================================
    /// =========== Modifiers ==============
    /// ====================================

    //TODO add modifiers after testing
    modifier onlyManager() {
        //  if (msg.sender != manager) revert NotManager();
        _;
    }

    /// ====================================
    /// ========== Constructor =============
    /// ====================================

    /// @notice Initializes the contract with the provided data address and sets the deployer as the manager.
    /// @param _dataAddress The address of the AlexandriaData contract.
    constructor(address _dataAddress) {
        data = AlexandriaData(_dataAddress);
        manager = msg.sender;
    }

    /// ========================
    /// ======= External =======
    /// ========================

    /// @notice Allows the current manager to set a new manager.
    /// @param _manager The address of the new manager. This should be AlexandriaV1
    function setManager(address _manager) external onlyManager {
        manager = _manager;
    }

    /// @notice Reserves pages for a book.
    /// @param _bookHash The hash of the book.
    /// @param pageCount The number of pages to reserve.
    /// @param bookBondAmount The bond amount for the book.
    /// @param msgSender The address of the sender.
    /// @return The ID of the reservation.
    function reservePages(
        bytes32 _bookHash,
        uint256 pageCount,
        uint256 bookBondAmount,
        address msgSender,
        string calldata bookURL
    ) external onlyManager returns (uint256) {
        if (isReserved[_bookHash]) revert BookAlreadyReserved(_bookHash);
        if (hasReserved[msgSender] > 0)
            revert ReservationError("Previous reservation pending.");

        uint256 startOfNewPages = nextPageIDToUse;
        uint256 endOfNewPages = nextPageIDToUse + pageCount - 1;

        reservations[nextReservationId] = Reservation({
            bookHash: _bookHash,
            reserver: msgSender,
            timestamp: block.timestamp,
            startPage: startOfNewPages,
            endPage: endOfNewPages,
            bookBondAmount: bookBondAmount,
            pageCount: uint16(pageCount),
            bookURL: bookURL
        });

        isReserved[_bookHash] = true;
        hasReserved[msgSender] = nextReservationId;

        emit ReservationMade(
            _bookHash,
            msgSender,
            nextReservationId,
            block.timestamp,
            startOfNewPages,
            endOfNewPages,
            bookBondAmount,
            uint16(pageCount),
            bookURL
        );

        nextPageIDToUse = endOfNewPages + 1;
        return nextReservationId++;
    }

    /// @notice Proposes a new book.
    /// @param carURI The car CID for IPFS containing the book metatdata.
    /// @param msgSender The address of the sender.
    function propose(
        string calldata carURI,
        address msgSender
    ) external onlyManager {
        if (hasReserved[msgSender] == 0)
            revert ReservationError("You must reserve pages first.");
        Reservation memory reservation = _getReservationForSender(msgSender);
        _validateIds(
            reservation.pageCount,
            reservation.startPage,
            reservation.endPage
        );
        _addBookToProposedDictionary(
            reservation.bookHash,
            nextBookId,
            reservation.startPage,
            reservation.endPage,
            reservation.bookBondAmount,
            msgSender,
            reservation.pageCount,
            carURI,
            reservation.bookURL
        );
        emit BookProposed(
            reservation.bookHash,
            nextBookId,
            reservation.startPage,
            reservation.endPage,
            reservation.bookBondAmount,
            msgSender,
            address(0),
            uint32(block.timestamp),
            reservation.pageCount,
            carURI,
            reservation.bookURL
        );
        hasReserved[msgSender] = 0;
        nextBookId++;
    }

    /// @notice Disputes a proposed book.
    /// @param proposedBookId The ID of the proposed book to dispute.
    /// @param disputer The address of the disputer.
    /// @return bookBondAmount The bond amount for the book.
    function dispute(
        uint256 proposedBookId,
        address disputer
    ) external onlyManager returns (uint256 bookBondAmount) {
        Book memory _proposedBook = _getAndValidateProposedBook(proposedBookId);
        _proposedBook.disputer = disputer;
        _moveToDisputeDictionary(proposedBookId, _proposedBook);
        emit BookDisputed(
            _proposedBook.bookHash,
            _proposedBook.bookId,
            _proposedBook.startPage,
            _proposedBook.endPage,
            _proposedBook.bookBondAmount,
            _proposedBook.proposer,
            _proposedBook.disputer,
            uint32(block.timestamp),
            _proposedBook.pageCount,
            _proposedBook.carURI,
            _proposedBook.bookURL
        );
        return _proposedBook.bookBondAmount;
    }

    /// @notice Adds a book to the mint queue after a dispute is resolved in favor of proposer.
    /// @param bookId The ID of the book to be added to the mint queue.
    function addToMintQueueAfterDispute(uint256 bookId) external onlyManager {
        Book memory disputedBook = data.getDisputeBookForQueue(bookId);
        if (disputedBook.timestamp == 0)
            revert DisputeNoExist({timestamp: disputedBook.timestamp});
        data.removeFromDisputeDictionary(bookId, disputedBook);
        data.addResolvedDisputeToMintQueue(disputedBook);
        emit BookAddedToMintQueue(bookId);
    }

    /// @notice Checks for expired reservations and slashes the bonds for those that have expired.
    /// @return bondsSlashed The total amount of bonds slashed for expired reservations.
    function checkAndSlashExpiredReservations()
        external
        onlyManager
        returns (uint256 bondsSlashed)
    {
        bondsSlashed = 0;

        while (oldestReservationId < nextReservationId) {
            Reservation storage reservation = reservations[oldestReservationId];

            if (
                block.timestamp <= reservation.timestamp + reservationDuration
            ) {
                break;
            }

            bondsSlashed += reservation.bookBondAmount;
            emit ReservationExpired(oldestReservationId);
            delete reservations[oldestReservationId];
            isReserved[reservation.bookHash] = false;
            hasReserved[reservation.reserver] = 0;
            oldestReservationId++;
        }
        return bondsSlashed;
    }

    /// =============================
    /// ======= External View =======
    /// =============================

    /// @notice Retrieves a disputed book.
    /// @param bookId The ID of the disputed book.
    /// @return The disputed book.
    function getDisputedBook(
        uint256 bookId
    ) external view onlyManager returns (Book memory) {
        return data.getDisputeBookForQueue(bookId);
    }

    /// ====================================
    /// ============ Internal ==============
    /// ====================================

    /// @notice Retrieves the reservation details for a given ID.
    /// @param reservationId The ID of the reservation.
    /// @return bookHash The hash of the book.
    /// @return reserver The address of the reserver.
    /// @return timestamp The timestamp of the reservation.
    /// @return startPage The starting page of the reservation.
    /// @return endPage The ending page of the reservation.
    /// @return bookBondAmount The bond amount for the book.
    /// @return pageCount The number of pages in the reservation.
    /// @return bookURL The URL of the book.
    function _getReservationDetails(
        uint256 reservationId
    )
        internal
        view
        returns (
            bytes32 bookHash,
            address reserver,
            uint256 timestamp,
            uint256 startPage,
            uint256 endPage,
            uint256 bookBondAmount,
            uint16 pageCount,
            string memory bookURL
        )
    {
        Reservation storage reservation = reservations[reservationId];
        return (
            reservation.bookHash,
            reservation.reserver,
            reservation.timestamp,
            reservation.startPage,
            reservation.endPage,
            reservation.bookBondAmount,
            reservation.pageCount,
            reservation.bookURL
        );
    }

    /// @notice Retrieves the reservation details for the sender's address.
    /// @param sender The address of the sender.
    /// @return The details of the reservation.
    function _getReservationForSender(
        address sender
    ) internal view returns (Reservation memory) {
        (
            bytes32 bookHash,
            address reserver,
            uint256 timestamp,
            uint256 startPage,
            uint256 endPage,
            uint256 bookBondAmount,
            uint16 pageCount,
            string memory bookURL
        ) = _getReservationDetails(hasReserved[sender]);
        return
            Reservation({
                bookHash: bookHash,
                reserver: reserver,
                timestamp: timestamp,
                startPage: startPage,
                endPage: endPage,
                bookBondAmount: bookBondAmount,
                pageCount: pageCount,
                bookURL: bookURL
            });
    }

    /// @notice Validates the provided page IDs against the expected page count.
    /// @param pageCount The expected number of pages.
    /// @param startPage The starting page ID.
    /// @param endPage The ending page ID.
    function _validateIds(
        uint16 pageCount,
        uint256 startPage,
        uint256 endPage
    ) internal view {
        if (endPage - startPage + 1 != pageCount)
            revert IdsNotEqualPagecount({
                pageCount: pageCount,
                length: endPage - startPage + 1
            });
        if (nextPageIDToUse + pageCount < nextPageIDToUse)
            revert IdOverflow({
                nextPageIDToUse: nextPageIDToUse,
                pageCount: pageCount
            });
    }

    /// @notice Adds a new book to the proposed dictionary.
    /// @param bookHash The hash of the book.
    /// @param bookId The ID of the book.
    /// @param startPage The starting page ID.
    /// @param endPage The ending page ID.
    /// @param bookBondAmount The bond amount for the book.
    /// @param msgSender The address of the sender.
    /// @param pageCount The number of pages in the book.
    /// @param carURI The car CID for IPFS containing the book metadata.
    /// @param bookURL The URL of the book.
    function _addBookToProposedDictionary(
        bytes32 bookHash,
        uint256 bookId,
        uint256 startPage,
        uint256 endPage,
        uint256 bookBondAmount,
        address msgSender,
        uint16 pageCount,
        string memory carURI,
        string memory bookURL
    ) internal {
        if (data.isProposed(bookHash))
            revert BookAlreadyProposed({bookHash: bookHash});
        data.setIsProposed(bookHash, true);
        Book memory newBook = Book(
            bookHash,
            bookId,
            startPage,
            endPage,
            bookBondAmount,
            msgSender,
            address(0),
            uint32(block.timestamp),
            pageCount,
            carURI,
            bookURL
        );
        data.addBookToProposedDictionary(nextBookId, newBook);
        data.setOldestBookInProposedDictionary(nextBookId, newBook);
    }

    /// @notice Retrieves and validates a proposed book by its ID.
    /// @param proposedBookId The ID of the proposed book.
    /// @return The details of the proposed book.
    function _getAndValidateProposedBook(
        uint256 proposedBookId
    ) internal view returns (Book memory) {
        Book memory _proposedBook = data.getProposedBookForDispute(
            proposedBookId
        );
        if (_proposedBook.timestamp == 0)
            revert ProposalNoExist({timestamp: _proposedBook.timestamp});
        if (data.bookExistsinDisputeDictionary(proposedBookId))
            revert ProposalAlreadyDisputed();
        uint32 defaultDisputePeriod = data.defaultDisputePeriod();
        if (block.timestamp > _proposedBook.timestamp + defaultDisputePeriod)
            revert DisputeTimeExpired({
                bookTimestamp: _proposedBook.timestamp,
                defaultDisputePeriod: defaultDisputePeriod
            });
        return _proposedBook;
    }

    /// @notice Moves a proposed book to the dispute dictionary.
    /// @param proposedBookId The ID of the proposed book.
    /// @param _proposedBook The details of the proposed book.
    function _moveToDisputeDictionary(
        uint256 proposedBookId,
        Book memory _proposedBook
    ) internal {
        data.removeFromProposedDictionary(proposedBookId, _proposedBook);
        data.updateOldestBookIdInProposedDictionary(proposedBookId);
        data.addBookToDisputeDictionary(proposedBookId, _proposedBook);
    }
}
