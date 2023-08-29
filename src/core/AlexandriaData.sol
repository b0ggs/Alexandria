// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Internal Libraries
import "./libraries/AlexandriaDataLibrary.sol";

// Custom errors
error NotAuthorized();
error OnlyManagerCanCall();

/// @title Alexandria Data Management Contract
/// @author B0gs
/// @notice This contract manages the data for Alexandria.
/// @dev Manages AlexandriaDataLibrary
contract AlexandriaData {
    // ========================
    // ==== State Variables ===
    // ========================
    mapping(bytes32 => bool) public isProposed;
    DataLibrary.DictionaryState public proposedDictionary;
    DataLibrary.DictionaryState public disputeDictionary;
    DataLibrary.QueueState public bookMintQueue;
    address public oracleManager;
    address public mintManager;
    address public manager;
    uint32 public defaultDisputePeriod = 1 days;

    // ========================
    // ======== Events ========
    // ========================

    event DisputePeriodUpdated(uint32 oldPeriod, uint32 newPeriod);
    event TokenURISet(uint256 tokenId, string uri);
    event DisputeAddedToMintQueue(
        uint256 bookId,
        address indexed disputer,
        uint32 timestamp,
        uint16 pageCount,
        string carURI
    );
    event BookAddedToDictionary(string dictionaryName, Book book);
    event OldestBookIdSet(uint256 oldestBookId);
    event BookRemovedFromDictionary(string dictionaryName, Book book);
    event OldestBookIdUpdated(uint256 oldestBookId);
    event PageArrayUpdated(uint256 totalIds);
    event MintQueueUpdated(string message);
    event BookAddedToQueue(Book book);

    // ========================
    // ====== Modifiers =======
    // ========================

    //TODO add modifiers after testing
    /// @notice Ensures only the oracle manager can call a function.
    modifier onlyOracleManager() {
        //   if (msg.sender != oracleManager) revert NotAuthorized();
        _;
    }

    /// @notice Ensures only the mint manager can call a function.
    modifier onlyMintManager() {
        //  if (msg.sender != mintManager) revert NotAuthorized();
        _;
    }

    /// @notice Ensures only the general manager can call a function.
    modifier onlyManager() {
        //   if (msg.sender != manager) revert OnlyManagerCanCall();
        _;
    }

    /// @notice Ensures only the oracle manager or general manager can call a function.
    modifier onlyOracleManagerOrManager() {
        //    if (msg.sender != oracleManager && msg.sender != manager)
        //  revert NotAuthorized();
        _;
    }

    // ========================
    // ===== Constructor ======
    // ========================

    /// @notice Initializes the contract with the deployer as the oracle, mint, and general manager.
    constructor() {
        oracleManager = msg.sender;
        mintManager = msg.sender;
        manager = msg.sender;
    }

    /// ========================
    /// ======= External =======
    /// ========================

    /// @notice Updates the oracle manager to a new address.
    /// @param _newOracleManager The address of the new oracle manager. Set to AlexandriaOracle Contract
    function setOracleManager(
        address _newOracleManager
    ) external onlyOracleManager {
        oracleManager = _newOracleManager;
    }

    /// @notice Updates the mint manager to a new address.
    /// @param _newMintManager The address of the new mint manager. Set to AlexandriaMint Contract
    function setMintManager(address _newMintManager) external onlyMintManager {
        mintManager = _newMintManager;
    }

    /// @notice Updates the general manager to a new address.
    /// @param _manager The address of the new general manager. Set to AlexandriaV1 Contract
    function setManager(address _manager) external onlyManager {
        manager = _manager;
    }

    /// @notice Updates the default dispute period.
    /// @param newDisputePeriod The new dispute period in seconds.
    function updateDisputePeriod(uint32 newDisputePeriod) external onlyManager {
        uint32 oldPeriod = defaultDisputePeriod;
        defaultDisputePeriod = newDisputePeriod;
        emit DisputePeriodUpdated(oldPeriod, defaultDisputePeriod);
    }

    /// @notice Sets the proposed status for a given book hash.
    /// @param bookHash The hash of the book.
    /// @param value The proposed status to set.
    function setIsProposed(
        bytes32 bookHash,
        bool value
    ) external onlyOracleManager {
        isProposed[bookHash] = value;
    }

    /// @notice Adds a book to the proposed dictionary.
    /// @param _bookId The ID of the book.
    /// @param _book The book details.
    function addBookToProposedDictionary(
        uint256 _bookId,
        Book memory _book
    ) external onlyOracleManager {
        DataLibrary.addToDictionary(proposedDictionary, _bookId, _book);
        emit BookAddedToDictionary("proposedDictionary", _book);
    }

    /// @notice Adds a book to the dispute dictionary.
    /// @param _bookId The ID of the book.
    /// @param _book The book details.
    function addBookToDisputeDictionary(
        uint256 _bookId,
        Book memory _book
    ) external onlyOracleManager {
        DataLibrary.addToDictionary(disputeDictionary, _bookId, _book);
        emit BookAddedToDictionary("disputeDictionary", _book);
    }

    /// @notice Sets the oldest book in the proposed dictionary.
    /// @param _bookId The ID of the oldest book.
    /// @param _book The book details.
    function setOldestBookInProposedDictionary(
        uint256 _bookId,
        Book memory _book
    ) external onlyOracleManager {
        DataLibrary.setOldestBookIdDictionary(
            proposedDictionary,
            _bookId,
            _book
        );
        emit OldestBookIdSet(proposedDictionary.oldestBookId);
    }

    /// @notice Updates the ID of the oldest book in the proposed dictionary.
    /// @param _bookId The ID to start the search from.
    function updateOldestBookIdInProposedDictionary(
        uint256 _bookId
    ) external onlyOracleManager {
        DataLibrary.updateOldestBookIdDictionary(proposedDictionary, _bookId);
        emit OldestBookIdUpdated(proposedDictionary.oldestBookId);
    }

    /// @notice Removes a book from the proposed dictionary.
    /// @param _bookId The ID of the book to remove.
    /// @param _proposedBook The details of the book to remove.
    function removeFromProposedDictionary(
        uint256 _bookId,
        Book calldata _proposedBook
    ) external onlyOracleManager {
        DataLibrary.removeFromDictionary(proposedDictionary, _bookId);
        emit BookRemovedFromDictionary("proposedDictionary", _proposedBook);
    }

    /// @notice Removes a book from the dispute dictionary.
    /// @param _bookId The ID of the book to remove.
    /// @param _disputedBook The details of the book to remove.
    function removeFromDisputeDictionary(
        uint256 _bookId,
        Book calldata _disputedBook
    ) external onlyOracleManagerOrManager {
        DataLibrary.removeFromDictionary(disputeDictionary, _bookId);
        emit BookRemovedFromDictionary("disputeDictionary", _disputedBook);
    }

    /// @notice Adds a resolved dispute to the mint queue.
    /// @param _disputedBook The details of the book that was in dispute.
    function addResolvedDisputeToMintQueue(
        Book calldata _disputedBook
    ) external onlyOracleManager {
        DataLibrary.addToQueue(bookMintQueue, _disputedBook);
        emit BookAddedToQueue(_disputedBook);
    }

    /// @notice Updates the page array in the mint queue.
    /// @param pages The number of pages to update.
    function updatePageQueue(uint256 pages) external onlyMintManager {
        DataLibrary.updatePageQueue(bookMintQueue, pages);
        emit PageArrayUpdated(bookMintQueue.totalIds);
    }

    /// @notice Updates the mint queue by moving books from the proposed dictionary to the mint queue after the dispute period.
    function updateMintQueue()
        external
        onlyMintManager
        returns (bool isUpdated)
    {
        bool _isUpdated = DataLibrary._updateMintQueue(
            proposedDictionary,
            defaultDisputePeriod,
            bookMintQueue
        );
        if (_isUpdated) {
            emit MintQueueUpdated("Book added");
        } else {
            emit MintQueueUpdated("Dispute Period Ongoing");
        }
        return _isUpdated;
    }

    /// =============================
    /// ======= External View =======
    /// =============================

    /// @notice Retrieves a proposed book for dispute.
    /// @param _bookId The ID of the book.
    /// @return The book details.
    function getProposedBookForDispute(
        uint256 _bookId
    ) external view returns (Book memory) {
        return DataLibrary.lookUpBookinDictionary(proposedDictionary, _bookId);
    }

    /// @notice Retrieves a disputed book for the mint queue.
    /// @param _bookId The ID of the book.
    /// @return The book details.
    function getDisputeBookForQueue(
        uint256 _bookId
    ) external view returns (Book memory) {
        return DataLibrary.lookUpBookinDictionary(disputeDictionary, _bookId);
    }

    /// @notice Checks if a book exists in the dispute dictionary.
    /// @param _bookId The ID of the book.
    /// @return exists True if the book exists, false otherwise.
    function bookExistsinDisputeDictionary(
        uint256 _bookId
    ) external view returns (bool exists) {
        return DataLibrary.bookExistsinDictionary(disputeDictionary, _bookId);
    }

    /// @notice Retrieves the number of pages in the mint queue.
    /// @return pages The number of pages.
    function getPagesInMintQueue() external view returns (uint256 pages) {
        return DataLibrary.pagesInQueue(bookMintQueue);
    }

    /// @notice Retrieves the book details from the mint queue.
    /// @return The book details.
    function getMintBook() external view returns (Book memory) {
        return DataLibrary.peekQueue(bookMintQueue);
    }

    /// @notice Retrieves the number of books in the mint queue.
    /// @return The number of books.
    function getBooksInQueue() external view returns (uint256) {
        return DataLibrary.getBooksInQueue(bookMintQueue);
    }
}
