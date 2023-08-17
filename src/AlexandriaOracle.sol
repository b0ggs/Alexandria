// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Imports
import {AlexandriaData} from "./AlexandriaData.sol";
import {Book} from "./AlexandriaDataLibrary.sol";

// Errors
error NotManager();
error IdsNotEqualPagecount(uint16 pageCount, uint256 idsLength);
error IdOverflow(uint256 nextPageIDToUse, uint16 pageCount);
error IncorrectID(uint256 id, uint256 nextPageIDToUse);
error BookAlreadyProposed(bytes32 bookHash);
error ProposalNoExist(uint32 timestamp);
error DisputeNoExist(uint32 timestamp);
error ProposalAlreadyDisputed();
error DisputeTimeExpired(uint32 bookTimestamp, uint32 defaultDisputePeriod);
error TransferFailed();
error InsufficientBond(uint256 bondAmount, uint256 requiredAmount);

/// @title Alexandria Oracle Contract
/// @author Bogs
/// @notice This contract handles the oracle functionalities for Alexandria.
/// @dev This contract interacts with the AlexandriaData contract.
contract AlexandriaOracle {
    // State Variables
    AlexandriaData public data;
    uint256 public nextBookId = 1;
    uint256 public nextPageIDToUse = 0;
    address public manager;

    // Events
    event BookProposed(
        uint256 bookId,
        uint256 bookBondAmount,
        bytes32 bookHash,
        address indexed proposer,
        address indexed disputer,
        uint32 timestamp,
        uint16 pageCount,
        string carURI
    );
    event BookDisputed(
        uint256 bookId,
        uint256 bookBondAmount,
        bytes32 bookHash,
        address indexed proposer,
        address indexed disputer,
        uint32 timestamp,
        uint16 pageCount,
        string carURI
    );

    // Modifiers
    modifier onlyManager() {
        if (msg.sender != manager) revert NotManager();
        _;
    }

    /// @notice Initializes the contract with the provided data address and sets the deployer as the manager.
    /// @param _dataAddress The address of the AlexandriaData contract.
    constructor(address _dataAddress) {
        data = AlexandriaData(_dataAddress);
        manager = msg.sender;
    }

    // External Functions
    /// @notice Allows the current manager to set a new manager.
    /// @param _manager The address of the new manager. This should be AlexandriaV1
    function setManager(address _manager) external onlyManager {
        manager = _manager;
    }

    /// @notice Proposes a new book.
    /// @param bookHash The hash of the book.
    /// @param bookBondAmount The bond amount for the book.
    /// @param carURI The car CID for IPFS containing the book metatdata.
    /// @param pageCount The number of pages in the book.
    /// @param ids The IDs for the pages.
    /// @param msgSender The address of the sender.
    function propose(
        bytes32 bookHash,
        uint256 bookBondAmount,
        string calldata carURI,
        uint16 pageCount,
        uint256[] calldata ids,
        address msgSender
    ) external onlyManager {
        _validateIds(pageCount, ids);
        _addBookToProposedDictionary(
            msgSender,
            bookBondAmount,
            bookHash,
            carURI,
            pageCount,
            ids
        );
        emit BookProposed(
            nextBookId,
            bookBondAmount,
            bookHash,
            msgSender,
            address(0),
            uint32(block.timestamp),
            pageCount,
            carURI
        );
        nextBookId++;
        nextPageIDToUse += pageCount;
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
            proposedBookId,
            _proposedBook.bookBondAmount,
            _proposedBook.bookHash,
            _proposedBook.proposer,
            _proposedBook.disputer,
            uint32(block.timestamp),
            _proposedBook.pageCount,
            _proposedBook.carURI
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
    }

    /// @notice Retrieves a disputed book.
    /// @param bookId The ID of the disputed book.
    /// @return The disputed book.
    function getDisputedBook(
        uint256 bookId
    ) external view onlyManager returns (Book memory) {
        return data.getDisputeBookForQueue(bookId);
    }

    // Internal Functions
    function _validateIds(
        uint16 pageCount,
        uint256[] memory ids
    ) internal view {
        if (ids.length != pageCount)
            revert IdsNotEqualPagecount({
                pageCount: pageCount,
                idsLength: ids.length
            });
        if (nextPageIDToUse + pageCount < nextPageIDToUse)
            revert IdOverflow({
                nextPageIDToUse: nextPageIDToUse,
                pageCount: pageCount
            });
        for (uint256 i = 0; i < pageCount; i++) {
            if (ids[i] != nextPageIDToUse + i)
                revert IncorrectID({
                    id: ids[i],
                    nextPageIDToUse: nextPageIDToUse + i
                });
        }
    }

    function _addBookToProposedDictionary(
        address msgSender,
        uint256 bookBondAmount,
        bytes32 bookHash,
        string memory carURI,
        uint16 pageCount,
        uint256[] memory ids
    ) internal {
        if (data.isProposed(bookHash))
            revert BookAlreadyProposed({bookHash: bookHash});
        data.setIsProposed(bookHash, true);
        Book memory newBook = Book(
            msgSender,
            address(0),
            bookHash,
            uint32(block.timestamp),
            pageCount,
            ids,
            bookBondAmount,
            carURI
        );
        data.addBookToProposedDictionary(nextBookId, newBook);
        data.setOldestBookInProposedDictionary(nextBookId, newBook);
    }

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

    function _moveToDisputeDictionary(
        uint256 proposedBookId,
        Book memory _proposedBook
    ) internal {
        data.removeFromProposedDictionary(proposedBookId, _proposedBook);
        data.updateOldestBookIdInProposedDictionary(proposedBookId);
        data.addBookToDisputeDictionary(proposedBookId, _proposedBook);
    }
}
