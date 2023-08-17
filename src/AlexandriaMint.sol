// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {ERC1155Supply} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import {AlexandriaData, Book, PayoutDetail} from "./AlexandriaData.sol";

// Errors
error NotManager();
error NoPagesInQueue();
error NFTMintedWithCurrentID(uint256 id);
error NotEnoughPages(uint256 pagesInQueue, uint256 amount);
error UriAlreadySet();
error BurnTransferFailed();
error AmountNotOne(uint256 index);

/// @title Alexandria Mint Contract
/// @author Bogs
/// @notice This contract handles the minting functionalities for Alexandria.
/// @dev This contract interacts with the AlexandriaData contract.
contract AlexandriaMint is ERC1155, ERC1155Supply {
    // State Variables
    AlexandriaData public data;
    address public manager;
    mapping(uint256 => string) public _uris;
    uint256 public totalNFTs = 0;

    // Events
    event PageMinted(
        uint256 tokenId,
        address indexed recipient,
        uint32 timestamp,
        string carURI
    );
    event PagesMinted(uint256[] tokenIds, address indexed recipient);

    // Modifiers
    modifier onlyManager() {
        if (msg.sender != manager) revert NotManager();
        _;
    }

    /// @notice Initializes the contract with the address of the AlexandriaData contract.
    /// @param _dataAddress The address of the AlexandriaData contract.
    constructor(address _dataAddress) ERC1155("null") {
        data = AlexandriaData(_dataAddress);
        manager = msg.sender;
    }

    /// @notice Returns the URI for a given token ID.
    /// @dev    Overrides the ERC1155 implementation
    /// @param tokenId The ID of the token to query.
    /// @return The URI of the token.
    function uri(uint256 tokenId) public view override returns (string memory) {
        return (_uris[tokenId]);
    }

    /// @notice Sets the manager of the contract.
    /// @param _manager The address of the new manager.
    function setManager(address _manager) external onlyManager {
        manager = _manager;
    }

    /// @notice Mints a single page.
    /// @param msgSender The address to receive the minted page.
    /// @return Payout details for the minted page.
    function mintPage(
        address msgSender
    ) external onlyManager returns (PayoutDetail memory) {
        if (data.getPagesInMintQueue() == 0) revert NoPagesInQueue();
        PayoutDetail memory payout;
        Book memory _mintBook = data.getMintBook();
        payout.proposer == _mintBook.proposer;
        payout.paymentAmount == _mintBook.bookBondAmount / _mintBook.pageCount;
        if (exists(_mintBook.ids[0]))
            revert NFTMintedWithCurrentID({id: _mintBook.ids[0]});
        _mint(msgSender, _mintBook.ids[0], 1, "");
        _setTokenUri(_mintBook.ids[0], _mintBook.carURI);
        data.updatePageArrayQueue(1);
        data.updateMintQueue();
        totalNFTs = totalNFTs + 1;
        emit PageMinted(
            _mintBook.ids[0],
            msgSender,
            uint32(block.timestamp),
            _mintBook.carURI
        );
        return payout;
    }

    /// @notice Mints multiple pages.
    /// @dev This is an abomination of a function and we should lose it after the hackathon
    /// @param amount The number of pages to mint.
    /// @param amounts The amounts for each page. amounts must each = 1
    /// @param msgSender The address to receive the minted pages.
    /// @return An array of payout details for the minted pages.
    function mintPages(
        uint256 amount,
        uint256[] calldata amounts,
        address msgSender
    ) external onlyManager returns (PayoutDetail[] memory) {
        for (uint256 i = 0; i < amounts.length; i++) {
            if (amounts[i] != 1) revert AmountNotOne(i);
        }
        uint256 pages = data.pagesInQueue();
        if (pages < amount)
            revert NotEnoughPages({pagesInQueue: pages, amount: amount});
        PayoutDetail[100] memory payouts;
        uint256 payoutIndex;
        totalNFTs = totalNFTs + amount;
        uint256[] memory ids = new uint256[](amount);
        uint256 currentIndex = 0;
        while (amount > 0) {
            Book memory _mintBook = data.getMintBook();
            uint256 pagesToTake = (amount > _mintBook.ids.length)
                ? _mintBook.ids.length
                : amount;
            uint256 pageValue = _mintBook.bookBondAmount / _mintBook.pageCount;
            for (uint256 i = 0; i < pagesToTake; i++) {
                ids[currentIndex] = _mintBook.ids[i];
                _setTokenUri(ids[currentIndex], _mintBook.carURI);
                currentIndex++;
            }
            bool proposerExists = false;
            for (uint256 i = 0; i < payoutIndex; i++) {
                if (payouts[i].proposer == _mintBook.proposer) {
                    payouts[i].paymentAmount += (pagesToTake * pageValue);
                    proposerExists = true;
                    break;
                }
            }
            if (!proposerExists) {
                payouts[payoutIndex].proposer = _mintBook.proposer;
                payouts[payoutIndex].paymentAmount = (pagesToTake * pageValue);
                payoutIndex++;
            }
            amount -= pagesToTake;
            data.updatePageArrayQueue(pagesToTake);
        }
        _mintBatch(msgSender, ids, amounts, "");
        emit PagesMinted(ids, msgSender);
        PayoutDetail[] memory finalPayouts = new PayoutDetail[](payoutIndex);
        for (uint256 i = 0; i < payoutIndex; i++) {
            finalPayouts[i] = payouts[i];
        }
        return finalPayouts;
    }

    /// @notice Burns a specific amount of tokens from a given address.
    /// @param account The address to burn tokens from.
    /// @param tokenId The ID of the token to burn.
    /// @param amount The amount of tokens to burn.
    function burnTokens(
        address account,
        uint256 tokenId,
        uint256 amount
    ) external onlyManager {
        _burn(account, tokenId, amount);
    }

    //internal functions
    function _setTokenUri(uint256 tokenId, string memory _carURI) internal {
        if (bytes(_uris[tokenId]).length != 0) revert UriAlreadySet();
        _uris[tokenId] = _carURI;
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory _data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, _data);
    }
}
