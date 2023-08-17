// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

/// @dev Struct representing a book with its details.
struct Book {
    address proposer; // Address of the proposer
    address disputer; // Address of the disputer
    bytes32 bookHash; // Keccak hash representing the book
    uint32 timestamp; // Timestamp of the proposal
    uint16 pageCount; // Total number of pages in the book
    uint256[] ids; // Array of ids for each page
    uint256 bookBondAmount; // Bond amount for the book
    string carURI; // IPFS CID for the book
}

/// @dev Struct representing payout details.
struct PayoutDetail {
    address proposer; // Address of the proposer
    uint256 paymentAmount; // Amount to be paid to the proposer
}

/// @title Data Library for managing books and queues of Alexandria
/// @author Bogs
/// @notice This library provides functionality for managing books and queues of Alexandria
/// @dev This library is used in conjunction with AlexandriaData, AlexandriaMint, AlexandriaOracle, AlexandriaV1.
library DataLibrary {
    // Custom errors
    error QueueEmpty();
    error NotEnoughPagesInBook();
    error BookAlreadyExists();
    error BookDoesNotExist(string message, uint256 bookId);

    /// @dev Struct representing the state of the dictionary.
    struct DictionaryState {
        mapping(uint256 => Book) dictionary; // Mapping of book IDs to Book structs
        uint256 oldestBookId; // ID of the oldest book
        uint256 count; // Count of books
    }

    /// @dev Struct representing the state of the queue.
    struct QueueState {
        uint256 head; // Head book of the queue
        uint256 tail; // Tail book of the queue
        uint256 totalIds; // Total number of IDs (pages) in the queue
        mapping(uint256 => Book) queue; // Mapping of book IDs to Book structs in the queue
    }

    /// @notice Adds a book to the queue.
    /// @param state The current state of the queue.
    /// @param _value The book to be added.
    function addToQueue(QueueState storage state, Book memory _value) public {
        state.queue[state.tail] = _value;
        state.totalIds += _value.ids.length;
        state.tail++;
    }

    /// @notice Removes a book from the queue.
    /// @param state The current state of the queue.
    function removeFromQueue(QueueState storage state) public {
        if (state.head >= state.tail) revert QueueEmpty();
        state.totalIds -= state.queue[state.head].ids.length;
        delete state.queue[state.head];
        state.head++;
    }

    /// @notice Peeks at the first book in the queue.
    /// @param state The current state of the queue.
    /// @return The first book in the queue.
    function peekQueue(
        QueueState storage state
    ) public view returns (Book memory) {
        if (state.head == state.tail) revert QueueEmpty();
        return state.queue[state.head];
    }

    /// @notice Gets the number of books in the queue.
    /// @param state The current state of the queue.
    /// @return The number of books in the queue.
    function getBooksInQueue(
        QueueState storage state
    ) public view returns (uint256) {
        if (state.head == state.tail) revert QueueEmpty();
        return state.tail - state.head;
    }

    /// @notice Updates the page array in the queue.
    /// @param state The current state of the queue.
    /// @param pagesToRemove The number of pages to remove.
    function updatePageArrayQueue(
        QueueState storage state,
        uint256 pagesToRemove
    ) public {
        Book storage currentBook = state.queue[state.head];
        if (currentBook.ids.length < pagesToRemove)
            revert NotEnoughPagesInBook();

        // Move the elements in the array to fill the gap created by the removed pages
        for (uint256 i = 0; i < currentBook.ids.length - pagesToRemove; i++) {
            currentBook.ids[i] = currentBook.ids[i + pagesToRemove];
        }

        // Pop the last pagesToRemove elements
        for (uint256 i = 0; i < pagesToRemove; i++) {
            currentBook.ids.pop();
        }

        // If all pages are removed, delete the book from the queue
        if (currentBook.ids.length == 0) {
            removeFromQueue(state);
        }

        state.totalIds -= pagesToRemove;
    }

    /// @notice Gets the total number of pages in the queue.
    /// @param state The current state of the queue.
    /// @return The total number of pages in the queue.
    function pagesInQueue(
        QueueState storage state
    ) public view returns (uint256) {
        return state.totalIds;
    }

    /// @notice Updates the mint queue with books from the proposed dictionary.
    /// @dev This function checks if the book's dispute period has ended and moves it from the proposed dictionary to the mint queue.
    /// @param proposedDictionary The state of the proposed dictionary.
    /// @param defaultDisputePeriod The default dispute period for books.
    /// @param bookMintQueue The state of the book mint queue.
    /// @return Returns true if the mint queue was updated, false otherwise.
    function _updateMintQueue(
        DictionaryState storage proposedDictionary,
        uint32 defaultDisputePeriod,
        QueueState storage bookMintQueue
    ) internal returns (bool) {
        if (proposedDictionary.count == 0) return false;

        Book memory bookToAdd = lookUpBookinDictionary(
            proposedDictionary,
            proposedDictionary.oldestBookId
        );
        if (block.timestamp <= bookToAdd.timestamp + defaultDisputePeriod)
            return false;

        removeFromDictionary(
            proposedDictionary,
            proposedDictionary.oldestBookId
        );
        updateOldestBookIdDictionary(
            proposedDictionary,
            proposedDictionary.oldestBookId
        );
        addToQueue(bookMintQueue, bookToAdd);
        return true;
    }

    /// @notice Adds a book to the dictionary.
    /// @dev This function adds a book to the dictionary and increments the book count.
    /// @param state The state of the dictionary.
    /// @param bookId The ID of the book to be added.
    /// @param book The book to be added.
    function addToDictionary(
        DictionaryState storage state,
        uint256 bookId,
        Book memory book
    ) public {
        if (bookExistsinDictionary(state, bookId)) revert BookAlreadyExists();
        state.dictionary[bookId] = book;
        state.count++;
    }

    /// @notice Removes a book from the dictionary.
    /// @dev This function removes a book from the dictionary and decrements the book count.
    /// @param state The state of the dictionary.
    /// @param bookId The ID of the book to be removed.
    function removeFromDictionary(
        DictionaryState storage state,
        uint256 bookId
    ) public {
        if (!bookExistsinDictionary(state, bookId))
            revert BookDoesNotExist("removeDictionary", bookId);
        delete state.dictionary[bookId];
        state.count--;
    }

    /// @notice Sets the oldest book ID in the dictionary.
    /// @dev This function sets the oldest book ID based on the book's timestamp.
    /// @param state The state of the dictionary.
    /// @param bookId The ID of the book.
    /// @param book The book whose timestamp is to be checked.
    function setOldestBookIdDictionary(
        DictionaryState storage state,
        uint256 bookId,
        Book memory book
    ) public {
        if (book.timestamp <= state.dictionary[state.oldestBookId].timestamp)
            return;
        if (state.oldestBookId == 0 || state.count == 0)
            state.oldestBookId = bookId;
    }

    /// @notice Updates the oldest book ID in the dictionary.
    /// @dev This function updates the oldest book ID by iterating through the dictionary.
    /// @param state The state of the dictionary.
    /// @param bookId The starting book ID for the iteration.
    function updateOldestBookIdDictionary(
        DictionaryState storage state,
        uint256 bookId
    ) public {
        if (state.count == 0) {
            state.oldestBookId = bookId;
            return;
        }

        uint256 updatedBookId = bookId + 1;
        uint256 remaining = state.count;

        while (remaining > 0 && !bookExistsinDictionary(state, updatedBookId)) {
            updatedBookId++;
            remaining--;
        }

        if (bookExistsinDictionary(state, updatedBookId))
            state.oldestBookId = updatedBookId;
    }

    /// @notice Looks up a book in the dictionary.
    /// @dev This function retrieves a book from the dictionary using its ID.
    /// @param state The state of the dictionary.
    /// @param bookId The ID of the book to be retrieved.
    /// @return The book corresponding to the given ID.
    function lookUpBookinDictionary(
        DictionaryState storage state,
        uint256 bookId
    ) public view returns (Book memory) {
        if (state.dictionary[bookId].timestamp == 0)
            revert BookDoesNotExist("lookUpBook", bookId);
        return state.dictionary[bookId];
    }

    /// @notice Checks if a book exists in the dictionary.
    /// @dev This function checks if a book exists in the dictionary based on its timestamp.
    /// @param state The state of the dictionary.
    /// @param bookId The ID of the book to be checked.
    /// @return Returns true if the book exists, false otherwise.
    function bookExistsinDictionary(
        DictionaryState storage state,
        uint256 bookId
    ) public view returns (bool) {
        return state.dictionary[bookId].timestamp > 0;
    }
}