// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.19;

//Internal Libraries
import {AlexandriaData, Book, PayoutDetail} from "./AlexandriaData.sol";
import {AlexandriaOracle} from "./AlexandriaOracle.sol";
import {AlexandriaMint} from "./AlexandriaMint.sol";

// External Libraries
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// Errors
error NotManager();
error TransferFailed();
error PaymentError(uint256 sentAmount, uint256 requiredAmount);
error ExceedsTreasuryBalance(uint256 requestedAmount, uint256 currentBalance);

/// @title Alexandria Version 1 Contract
/// @author b0ggs & ethaspera
/// @notice This contract integrates AlexandriaData, AlexandriaOracle, and AlexandriaMint.
/// @dev This is the main contract for the Alexandria protocol.
contract AlexandriaV1 is ReentrancyGuard {
    // ========================
    // ==== State Variables ===
    // ========================

    AlexandriaData public data;
    AlexandriaOracle public oracle;
    AlexandriaMint public mint;
    mapping(uint256 => bool) public wasDisputed;
    address public manager;
    address public AlexandriaAllo;
    uint256 public treasuryBalance = 0;
    uint256 public bondBalance = 0;
    uint128 public proposeBond = 0.001 ether;
    uint8 public bonusPercentage = 10;
    uint8 public slashPercentage = 25;
    uint8 public settlePercentage = 75; // orcle dispute reward

    /// ======================
    /// ======= Events =======
    /// ======================

    event BonusPercentageUpdated(uint8 oldPercentage, uint8 newPercentage);
    event ProposeBondUpdated(uint128 oldBond, uint128 newBond);
    event PageBurned(
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

    /// ====================================
    /// =========== Modifiers ==============
    /// ====================================

    modifier onlyManager() {
        if (msg.sender != manager) revert NotManager();
        _;
    }

    modifier onlyAllo() {
        if (msg.sender != AlexandriaAllo) revert NotManager();
        _;
    }

    /// ====================================
    /// ========== Constructor =============
    /// ====================================

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
        AlexandriaAllo = msg.sender;
        data = AlexandriaData(_dataAddress);
        oracle = AlexandriaOracle(_oracleAddress);
        mint = AlexandriaMint(_mintAddress);
    }

    /// ========================
    /// ======= External =======
    /// ========================

    /// @notice Sets a new manager for the contract.
    /// @param _manager The address of the new manager. This should be the governance address.
    function setManager(address _manager) external onlyManager {
        manager = _manager;
    }

    /// @notice Moves books from the proposedDictionary to the mintQueue
    /// NOTE It's essential to call this function to insure there are mintable pages
    /// NOTE proposers should be incentivized to call this because they earn a fee on mints.
    /// NOTE there needs to be additional testing as to whether this should loop or move 1 book
    /// NOTE based on the incentives.
    function updateMintQueue() external {
        bool continueUpdating = true;

        while (continueUpdating) {
            continueUpdating = data.updateMintQueue();
        }
    }

    /// @notice Updates the bonus percentage that a proposer recieves when pages are minted.
    /// @param newBonusPercentage The new bonus percentage value.
    function updateBonusPercentage(
        uint8 newBonusPercentage
    ) external onlyManager {
        uint8 oldPercentage = bonusPercentage;
        bonusPercentage = newBonusPercentage;
        emit BonusPercentageUpdated(oldPercentage, bonusPercentage);
    }

    /// @notice Updates the percentage of bonds that get slashed.
    /// @param newSlashPercentage The new slash percentage value.
    function updateSlashPercentage(
        uint8 newSlashPercentage
    ) external onlyManager {
        uint8 oldPercentage = slashPercentage;
        slashPercentage = newSlashPercentage;
        emit BonusPercentageUpdated(oldPercentage, slashPercentage);
    }

    /// @notice Updates the percentage of the reward for an oracle dispute.
    /// @param newSettlePercentage The new settle percentage value.
    function updateSettlePercentage(
        uint8 newSettlePercentage
    ) external onlyManager {
        uint8 oldPercentage = settlePercentage;
        settlePercentage = newSettlePercentage;
        emit BonusPercentageUpdated(oldPercentage, settlePercentage);
    }

    /// @notice Updates the bond required to propose.
    /// @dev DO NOT UPDATE unless logic for backing per a token is implemented for different bond values.
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
        if (amount > treasuryBalance) {
            revert ExceedsTreasuryBalance(amount, treasuryBalance);
        }
        _transferTo(recipient, amount, "Treasury Withdrawal");
        treasuryBalance -= amount;
    }

    /// @notice Checks and slashes bonds for expired reservations.
    /// @dev This function also handles the redistribution of slashed bonds.
    function checkAndSlashExpiredReservations() external {
        uint256 bondsSlashed = oracle.checkAndSlashExpiredReservations();
        _handleSlashedBonds(bondsSlashed);
    }

    /// @notice Proposes a new book.
    /// @param carURI CAR CID of the IPFS that holds all JSON data for pages.
    function propose(string calldata carURI) external {
        oracle.propose(carURI, msg.sender);
    }

    /// @notice Settles a dispute for a book.
    /// @param bookId The ID of the book in dispute.
    /// @param isPassed A boolean indicating if the book passed the dispute
    function settle(
        uint256 bookId,
        bool isPassed
    ) external onlyManager nonReentrant {
        Book memory disputedBook = oracle.getDisputedBook(bookId);
        uint256 totalBond = (disputedBook.bookBondAmount * 2);
        uint256 reward = (totalBond * settlePercentage) / 100;
        address recipient = isPassed
            ? disputedBook.proposer
            : disputedBook.disputer;
        _transferTo(
            recipient,
            reward,
            isPassed ? "Settled Pay Proposer" : "Settled Pay Disputer"
        );
        if (isPassed) {
            oracle.addToMintQueueAfterDispute(bookId);
        } else {
            data.removeFromDisputeDictionary(bookId, disputedBook);
        }

        treasuryBalance += totalBond - reward;
        bondBalance -= totalBond;
    }

    /// @notice Reserves pages for a given book hash.
    /// @param bookHash The hash of the book for which pages are being reserved.
    /// @param pageCount The number of pages to reserve.
    /// @param bookURL The URL of the book.
    function reservePages(
        bytes32 bookHash,
        uint256 pageCount,
        string calldata bookURL
    ) external payable nonReentrant {
        uint256 totalBookBond = pageCount * proposeBond;
        oracle.reservePages(
            bookHash,
            pageCount,
            totalBookBond,
            msg.sender,
            bookURL
        );
        _handleBondPayment(totalBookBond);
    }

    /// ===============================
    /// ======= External Payable ======
    /// ===============================

    /// @notice Disputes a proposed book.
    /// @param proposedBookId The ID of the book to dispute.
    function dispute(uint256 proposedBookId) external payable nonReentrant {
        uint256 bookBondAmount = oracle.dispute(proposedBookId, msg.sender);
        _handleBondPayment(bookBondAmount);
        wasDisputed[proposedBookId] = true;
    }

    /// @notice Mints a page as an ERC1155 NFT
    function mintPage() external payable nonReentrant {
        (PayoutDetail memory payout, uint256 bookId) = mint.mintPage(
            msg.sender
        );

        address paymentRecipient = !wasDisputed[bookId] ||
            msg.sender == payout.proposer
            ? payout.proposer
            : address(this);

        if (!wasDisputed[bookId]) {
            treasuryBalance += payout.paymentAmount;
            bondBalance -= payout.paymentAmount;
        }

        _handleMintPayment(paymentRecipient, payout.paymentAmount);
    }

    /// @notice Mints a page as an ERC1155 NFT on behalf of a donor.
    /// @dev Only to be used with Allo AlexandriaStrategy
    /// @param msgSender The address of the donor.
    function mintPageDonation(
        address msgSender
    ) external payable nonReentrant onlyAllo {
        (PayoutDetail memory payout, uint256 bookId) = mint.mintPage(msgSender);

        address paymentRecipient = !wasDisputed[bookId] ||
            msgSender == payout.proposer
            ? payout.proposer
            : address(this);

        if (!wasDisputed[bookId]) {
            treasuryBalance += payout.paymentAmount;
            bondBalance -= payout.paymentAmount;
        }

        _handleMintPayment(paymentRecipient, payout.paymentAmount);
    }

    /// ============================
    /// ======= External View ======
    /// ============================

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

    /// ======================
    /// ======= Public =======
    /// ======================

    /// @notice Claims and burns a token, allowing the holder to claim its backing value.
    /// @param tokenId The ID of the token to claim and burn.
    function claimAndBurn(uint256 tokenId) public nonReentrant {
        uint256 backing = backingPerToken();
        mint.burnTokens(msg.sender, tokenId, 1);
        _transferTo(msg.sender, backing, "Rage Quit!");
        treasuryBalance -= backing;
        emit PageBurned(tokenId, msg.sender, backing);
    }

    /// ========================
    /// ======= Public View =====
    /// ========================

    /// @notice Calculates the backing value per token.
    /// @return The backing value per token.
    function backingPerToken() public view returns (uint256) {
        if (mint.totalNFTs() == 0) {
            return 0;
        }
        return treasuryBalance / mint.totalNFTs();
    }

    /// ====================================
    /// ============ Internal ==============
    /// ====================================

    /// @notice Handles the redistribution of slashed bonds.
    /// @param slashedBonds The amount of bonds that were slashed.
    function _handleSlashedBonds(uint256 slashedBonds) internal {
        uint256 slasherReward = (slashedBonds * slashPercentage) / 100;
        _transferTo(msg.sender, slasherReward, "Reserved Pages Slashed Reward");
        bondBalance -= slashedBonds;
        treasuryBalance += (slashedBonds - slasherReward);
    }

    /// @notice Processes the bond payment for a given amount.
    /// @param _bookBondAmount The amount of the bond to be processed.
    function _handleBondPayment(uint256 _bookBondAmount) internal {
        _processPayment(_bookBondAmount, "Bond Refund");
        bondBalance += _bookBondAmount;
    }

    /// @notice Handles the mint payment process.
    /// @param _proposer The address of the proposer.
    /// @param _paymentAmount The amount to be paid.
    function _handleMintPayment(
        address _proposer,
        uint256 _paymentAmount
    ) internal {
        uint256 totalPayout = _paymentAmount +
            ((_paymentAmount * bonusPercentage) / 100);

        if (_proposer == msg.sender) {
            _processPayment(0, "Mint Refund");
        } else if (_proposer == address(this)) {
            _processPayment(totalPayout, "Mint Refund");
        } else {
            _processPayment(totalPayout, "Mint Refund");
            _transferTo(_proposer, totalPayout, "Mint Pay Proposer");
        }
    }

    /// @notice Processes a payment and ensures the correct amount is sent.
    /// @param _requiredAmount The required amount for the payment.
    /// @param paymentType A string describing the type of payment.
    function _processPayment(
        uint256 _requiredAmount,
        string memory paymentType
    ) internal {
        if (msg.value > _requiredAmount) {
            uint256 refundAmount = msg.value - _requiredAmount;
            _refund(msg.sender, refundAmount, paymentType);
        } else if (msg.value < _requiredAmount) {
            revert PaymentError({
                sentAmount: msg.value,
                requiredAmount: _requiredAmount
            });
        }
    }

    /// ====================================
    /// ======= Internal Payable ===========
    /// ====================================

    /// @notice Refunds an amount to a given recipient.
    /// @param recipient The address to receive the refund.
    /// @param amount The amount to be refunded.
    /// @param reason A string describing the reason for the refund.
    function _refund(
        address recipient,
        uint256 amount,
        string memory reason
    ) internal {
        (bool success, ) = payable(recipient).call{value: amount}("");
        if (!success) revert TransferFailed();
        emit PaymentProcessed(
            address(this),
            recipient,
            amount,
            0,
            amount,
            reason
        );
    }

    /// @notice Transfers a specified amount to a given recipient.
    /// @param recipient The address to receive the amount.
    /// @param amount The amount to be transferred.
    /// @param paymentType A string describing the type of payment.
    function _transferTo(
        address recipient,
        uint256 amount,
        string memory paymentType
    ) internal {
        (bool success, ) = payable(recipient).call{value: amount}("");
        if (!success) revert TransferFailed();
        emit PaymentProcessed(
            address(this),
            recipient,
            amount,
            amount,
            0,
            paymentType
        );
    }
}
