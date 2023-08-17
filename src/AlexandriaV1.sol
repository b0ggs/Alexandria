// Check Reentrancy for payments
// Fix manager roles for Mint and Oracle
//NOTE update book queue on calls
// View function to view all managers and other contracts?
//// hash for testing 0x3fd54831f488a22b28398de0c567a3b064b937f54f81739ae9bd545967f3abab. // book 1 5 pages
// 0x3fd54831f588a22b28398de0c567a3b064b937f54f81739ae9bd545967f3abab. // book 2 5 pages
//0x3fd54831f588a22b28398df0c567a3b064b937f54f81739ae9bd545967f3abab. // book 3 5 pages
//0x3fd54831f588a22b28398df0c567a3b064b937f54f81739ae9bd545967f3abac // book 4 1 page
//0x3fd54831f588a22b28398df0c567a3b064b937f54f81739ae9bd545967f3abad // book 5 1 page
//0x3fd54831f588a22b28398df0c567a3b064b937f54f81739ae9bd545967f3abae
// Move bondBalance, totalBond, Etc. to this contract
// Have this contract handle all ETH and payments. Remove from mint.

// CHECK why non-proposer made more ETH
// checks for balances (bondBalance, treasury)
// clean up and comment code
// What other functions in this contract? Set managers?
//Can we transfer NFTs?
// How can we batch burn?

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {AlexandriaData, Book, PayoutDetail} from "./AlexandriaData.sol";
import {AlexandriaOracle} from "./AlexandriaOracle.sol";
import {AlexandriaMint} from "./AlexandriaMint.sol";

// Errors
error NotManager();
error InsufficientBond(uint256 bondAmount, uint256 requiredAmount);
error TransferFailed();
error InsufficientMintPayment(uint256 sentAmount, uint256 requiredAmount);
error ExceedsTreasuryBalance(uint256 requestedAmount, uint256 currentBalance);

/// @title Alexandria Version 1 Contract
/// @author bogs
/// @notice This contract integrates AlexandriaData, AlexandriaOracle, and AlexandriaMint.
/// @dev This is the main contract for the Alexandria protocol.
contract AlexandriaV1 is ReentrancyGuard {
    // State variables
    AlexandriaData public data;
    AlexandriaOracle public oracle;
    AlexandriaMint public mint;
    address public manager;
    uint256 public treasuryBalance = 0;
    uint256 public bondBalance = 0;
    uint128 public proposeBond = 0.001 ether;
    uint8 public bonusPercentage = 10;

    // Events
    event BonusPercentageUpdated(uint8 oldPercentage, uint8 newPercentage);
    event ProposeBondUpdated(uint128 oldBond, uint128 newBond);
    event TokenClaimedAndBurned(
        uint256 tokenId,
        address indexed claimer,
        uint256 backingValue
    );
    event PaymentProcessed(
        address indexed payer,
        address indexed recipient,
        uint256 sentAmount,
        uint256 requiredAmount,
        uint256 refundedAmount,
        string paymentType
    );

    // Modifiers
    modifier onlyManager() {
        if (msg.sender != manager) revert NotManager();
        _;
    }

    /// @notice Initializes the contract with the provided addresses for data, oracle, and mint contracts.
    /// @param _dataAddress The address of the AlexandriaData contract.
    /// @param _oracleAddress The address of the AlexandriaOracle contract.
    /// @param _mintAddress The address of the AlexandriaMint contract.
    constructor(
        address _dataAddress,
        address _oracleAddress,
        address _mintAddress
    ) {
        manager = msg.sender;
        data = AlexandriaData(_dataAddress);
        oracle = AlexandriaOracle(_oracleAddress);
        mint = AlexandriaMint(_mintAddress);
    }

    // External functions
    /// @notice Sets a new manager for the contract.
    /// @param _manager The address of the new manager. This should be the governance address.
    function setManager(address _manager) external onlyManager {
        manager = _manager;
    }

    /// @notice Updates the bonus percentage that a proposer recieves when pages are minted.
    /// @param newBonusPercentage The new bonus percentage value.
    function updateBonusPercentage(
        uint8 newBonusPercentage
    ) external onlyManager {
        uint8 oldPercentage = bonusPercentage;
        bonusPercentage = newBonusPercentage;
        emit BonusPercentageUpdated(oldPercentage, newBonusPercentage);
    }

    /// @notice Updates the bond required to propose.
    /// @dev DO NOT UPDATE unless logic for backing per a token is implemented for different bond values. (after hackathon)
    /// @param newProposeBond The new bond value.
    function updateProposeBond(uint128 newProposeBond) external onlyManager {
        uint128 oldBond = proposeBond;
        proposeBond = newProposeBond;
        emit ProposeBondUpdated(oldBond, proposeBond);
    }

    /// @notice Withdraws a specified amount from the treasury.
    /// @param amount The amount to withdraw.
    /// @param recipient The address to receive the withdrawn amount. Should be DAO multi-sig or hardcoded treasury contract.
    function withdrawFromTreasury(
        uint256 amount,
        address payable recipient
    ) external onlyManager {
        if (amount > treasuryBalance)
            revert ExceedsTreasuryBalance(amount, treasuryBalance);
        treasuryBalance -= amount;
        recipient.transfer(amount);
    }

    /// @notice Proposes a new book.
    /// @param bookHash The hash of the book.
    /// @param carURI CAR CID of the IPFS that holds all JSON data for pages.
    /// @param pageCount The number of pages in the book.
    /// @param ids Each id represents an individual page.
    function propose(
        bytes32 bookHash,
        string calldata carURI,
        uint16 pageCount,
        uint256[] calldata ids
    ) external payable {
        oracle.propose(
            bookHash,
            pageCount * proposeBond,
            carURI,
            pageCount,
            ids,
            msg.sender
        );
        _handleBondPayment(pageCount * proposeBond);
    }

    /// @notice Disputes a proposed book.
    /// @param proposedBookId The ID of the book to dispute.
    function dispute(uint256 proposedBookId) external payable {
        uint256 bookBondAmount = oracle.dispute(proposedBookId, msg.sender);
        _handleBondPayment(bookBondAmount);
    }

    /// @notice Settles a dispute for a book.
    /// @param bookId The ID of the book in dispute.
    /// @param isPassed A boolean indicating if the book passed the dispute
    function settle(
        uint256 bookId,
        bool isPassed
    ) external onlyManager nonReentrant {
        Book memory disputedBook = oracle.getDisputedBook(bookId);
        uint256 threeFourthsPayment = ((disputedBook.bookBondAmount * 2) / 4) *
            3; // 3/4 of proposer bond + dispute bond
        if (isPassed) {
            oracle.addToMintQueueAfterDispute(bookId);
            payable(disputedBook.proposer).transfer(threeFourthsPayment);
            emit PaymentProcessed(
                address(this),
                disputedBook.proposer,
                threeFourthsPayment,
                threeFourthsPayment,
                0,
                "Settled Pay Proposer"
            );
        } else {
            data.removeFromDisputeDictionary(bookId, disputedBook);
            payable(disputedBook.disputer).transfer(threeFourthsPayment);
            emit PaymentProcessed(
                address(this),
                disputedBook.disputer,
                threeFourthsPayment,
                threeFourthsPayment,
                0,
                "Settled Pay Disputer"
            );
        }
    }

    /// @notice Mints a page as an ERC1155 NFT
    function mintPage() external payable nonReentrant {
        PayoutDetail memory payout = mint.mintPage(msg.sender);
        _handleMintPayment(payout.proposer, payout.paymentAmount);
        treasuryBalance += payout.paymentAmount;
        bondBalance -= payout.paymentAmount;
    }

    /// @notice Mints multiple pages.
    /// @param amount The number of pages to mint.
    /// @param amounts The amounts for each page.
    function mintPages(
        uint256 amount,
        uint256[] calldata amounts
    ) external payable nonReentrant {
        PayoutDetail[] memory payouts = mint.mintPages(
            amount,
            amounts,
            msg.sender
        );
        for (uint256 i = 0; i < payouts.length; i++) {
            PayoutDetail memory payout = payouts[i];
            _handleMintPayment(payout.proposer, payout.paymentAmount);
            treasuryBalance += payout.paymentAmount;
            bondBalance -= payout.paymentAmount;
        }
    }

    /// @notice Claims and burns a token, allowing the holder to claim its backing value.
    /// @param tokenId The ID of the token to claim and burn.
    function claimAndBurn(uint256 tokenId) public nonReentrant {
        uint256 backing = backingPerToken();
        mint.burnTokens(msg.sender, tokenId, 1);
        (bool success, ) = payable(msg.sender).call{value: backing}("");
        if (!success) revert TransferFailed();
        emit TokenClaimedAndBurned(tokenId, msg.sender, backing);
    }

    /// @notice Fetches the URI of a token.
    /// @param tokenId The ID of the token.
    /// @return The URI of the token.
    function getTokenUri(
        uint256 tokenId
    ) external view returns (string memory) {
        return mint.uri(tokenId);
    }

    /// @notice Fetches a book from the proposed dictionary.
    /// @param _bookId The ID of the book.
    /// @return The book details.
    function getBookFromProposedDictionary(
        uint256 _bookId
    ) external view returns (Book memory) {
        return data.getProposedBookForDispute(_bookId);
    }

    // Public functions
    /// @notice Calculates the backing value per token.
    /// @return The backing value per token.
    function backingPerToken() public view returns (uint256) {
        if (mint.totalNFTs() == 0) {
            return 0;
        }
        return treasuryBalance / mint.totalNFTs();
    }

    // Internal functions
    function _handleBondPayment(uint256 _bookBondAmount) internal {
        if (msg.value < _bookBondAmount)
            revert InsufficientBond({
                bondAmount: msg.value,
                requiredAmount: _bookBondAmount
            });
        if (msg.value > _bookBondAmount) {
            (bool success, ) = payable(msg.sender).call{
                value: msg.value - _bookBondAmount
            }("");
            if (!success) revert TransferFailed();
            emit PaymentProcessed(
                msg.sender,
                address(this),
                msg.value,
                _bookBondAmount,
                msg.value - _bookBondAmount,
                "Bond"
            );
        }
        bondBalance += _bookBondAmount;
    }

    function _handleMintPayment(
        address _proposer,
        uint256 _paymentAmount
    ) internal {
        uint256 totalPayout = _paymentAmount +
            ((_paymentAmount * bonusPercentage) / 100);
        if (_proposer != msg.sender) {
            if (msg.value < totalPayout)
                revert InsufficientMintPayment({
                    sentAmount: msg.value,
                    requiredAmount: totalPayout
                });
            if (msg.value > totalPayout) {
                (bool success, ) = payable(msg.sender).call{
                    value: msg.value - totalPayout
                }("");
                if (!success) revert TransferFailed();
                emit PaymentProcessed(
                    address(this),
                    msg.sender,
                    msg.value,
                    totalPayout,
                    msg.value - totalPayout,
                    "Mint Refund"
                );
            }
            payable(_proposer).transfer(totalPayout);
            emit PaymentProcessed(
                address(this),
                _proposer,
                totalPayout,
                totalPayout,
                0,
                "Mint Pay Proposer"
            );
        } else {
            if (msg.value > 0) {
                (bool success, ) = payable(msg.sender).call{value: msg.value}(
                    ""
                );
                if (!success) revert TransferFailed();
                emit PaymentProcessed(
                    address(this),
                    msg.sender,
                    msg.value,
                    0,
                    msg.value,
                    "Mint Refund"
                );
            }
        }
    }
}
