// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Internal Libraries
import {AlexandriaData, Book, PayoutDetail} from "./AlexandriaData.sol";

// External Libraries
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {ERC1155Supply} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

// Errors
error NotManager();
error NoPagesInQueue();
error NFTMintedWithCurrentID(uint256 id);
error UriAlreadySet();

/// @title Alexandria Mint Contract
/// @author b0ggs & ethaspera
/// @notice This contract handles the minting functionalities for Alexandria.
/// @dev This contract interacts with the AlexandriaData contract.
contract AlexandriaMint is ERC1155, ERC1155Supply {
    // ========================
    // ==== State Variables ===
    // ========================

    AlexandriaData public data;
    address public manager;
    string public constant NAME = "Alexandria";
    string public constant SYMBOL = "PAGE";
    mapping(uint256 => string) public _uris;
    uint256 public totalNFTs = 0;

    /// ======================
    /// ======= Events =======
    /// ======================

    event PageMinted(
        uint256 tokenId,
        address indexed recipient,
        uint32 timestamp,
        string carURI
    );

    /// ====================================
    /// =========== Modifiers ==============
    /// ====================================

    modifier onlyManager() {
        if (msg.sender != manager) revert NotManager();
        _;
    }

    /// ====================================
    /// ========== Constructor =============
    /// ====================================

    /// @notice Initializes the contract with the address of the AlexandriaData contract.
    /// @param _dataAddress The address of the AlexandriaData contract.
    constructor(address _dataAddress) ERC1155("null") {
        data = AlexandriaData(_dataAddress);
        manager = msg.sender;
    }

    /// ========================
    /// ======= External =======
    /// ========================

    /// @notice Sets the manager of the contract.
    /// @param _manager The address of the new manager.
    function setManager(address _manager) external onlyManager {
        manager = _manager;
    }

    /// @notice Mints a single page.
    /// @param recipient The address to receive the minted page.
    /// @return Payout details for the minted page and the book ID associated with the minted page.
    function mintPage(
        address recipient
    ) external onlyManager returns (PayoutDetail memory, uint256 bookID) {
        if (data.getPagesInMintQueue() == 0) revert NoPagesInQueue();
        Book memory _mintBook = data.getMintBook();

        if (exists(_mintBook.startPage))
            revert NFTMintedWithCurrentID({id: _mintBook.startPage});

        PayoutDetail memory payout = PayoutDetail({
            proposer: _mintBook.proposer,
            paymentAmount: _mintBook.bookBondAmount / _mintBook.pageCount
        });

        _mint(recipient, _mintBook.startPage, 1, "");
        _setTokenUri(_mintBook.startPage, _mintBook.carURI);

        data.updatePageQueue(1);

        totalNFTs += 1;

        emit PageMinted(
            _mintBook.startPage,
            recipient,
            uint32(block.timestamp),
            _mintBook.carURI
        );

        return (payout, _mintBook.bookId);
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
        totalNFTs -= 1;
    }

    /// ======================
    /// ======= Public =======
    /// ======================

    /// @notice Returns the URI for a given token ID.
    /// @dev Overrides the ERC1155 implementation.
    /// @param tokenId The ID of the token to query.
    /// @return The URI of the token.
    function uri(uint256 tokenId) public view override returns (string memory) {
        return (_uris[tokenId]);
    }

    /// ====================================
    /// ============ Internal ==============
    /// ====================================

    /// @notice Sets the URI for a given token ID.
    /// @param tokenId The ID of the token.
    /// @param _carURI The URI to set for the token.
    function _setTokenUri(uint256 tokenId, string memory _carURI) internal {
        if (bytes(_uris[tokenId]).length != 0) revert UriAlreadySet();
        _uris[tokenId] = _carURI;
    }

    /// @notice Hook that is called before any token transfer, including mints and burns.
    /// @param operator The address performing the function call.
    /// @param from The address tokens are being transferred from.
    /// @param to The address tokens are being transferred to.
    /// @param ids An array of token IDs being transferred.
    /// @param amounts An array of the amounts of tokens being transferred.
    /// @param _data Additional data with no specified format.
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
