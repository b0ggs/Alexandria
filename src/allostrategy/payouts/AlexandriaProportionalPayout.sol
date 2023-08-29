// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.0 <0.9.0;

// Interfaces
import "../interfaces/IAlexandriaPayoutStrategy.sol";

// Internal Libraries
import "../../core/AlexandriaV1.sol";

/// @title Alexandria Proportional Voting Payout Strategy
/// @author b0gs
/// @notice This contract implements the proportional voting payout strategy for the Alexandria protocol.
contract AlexandriaProportionalPayout is IAlexandriaPayoutStrategy {
    /// ==========================
    /// ==== State Variables =====
    /// ==========================

    AlexandriaV1 public alexandria;
    address public alexandriaStrategy;
    uint256 public mintCost;
    uint256 public minimumDonation;
    mapping(address => uint256) public votes;

    /// ====================================
    /// =========== Modifiers ==============
    /// ====================================

    modifier onlyAlexandriaStrategy() {
        require(
            msg.sender == alexandriaStrategy,
            "Caller is not the AlexandriaStrategy"
        );
        _;
    }

    /// ====================================
    /// ========== Constructor =============
    /// ====================================

    /// @notice Constructs a new AlexandriaProportionalPayout contract
    /// @param _alexandria Address of the Alexandria contract
    /// @param _alexandriaStrategy Address of the associated AlexandriaStrategy contract
    constructor(address _alexandria, address _alexandriaStrategy) {
        alexandria = AlexandriaV1(_alexandria);
        mintCost =
            alexandria.proposeBond() +
            ((alexandria.proposeBond() * alexandria.bonusPercentage()) / 100);
        minimumDonation = mintCost + (mintCost / 100);
        alexandriaStrategy = _alexandriaStrategy;
    }

    // ====================================
    // ========= External Functions =======
    // ====================================

    /// @notice Updates the votes for a given project based on a donation amount
    /// @dev We do not count the mintCost towards votes in this strategy
    /// @param project Address of the project to update votes for
    /// @param donateAndMintAmount Amount of the donation and mint combined
    function updateVotesForDonation(
        address project,
        uint256 donateAndMintAmount
    ) external onlyAlexandriaStrategy {
        uint256 actualDonation = donateAndMintAmount - mintCost;
        votes[project] += actualDonation;
    }

    /// @notice Retrieves the payout amount for a specific recipient
    /// @param _recipientId Address of the recipient
    /// @param totalAmount Total amount available for distribution
    /// @param recipients List of recipient addresses
    /// @return The payout amount for the specified recipient
    function getPayoutAmount(
        address _recipientId,
        uint256 totalAmount,
        address[] calldata recipients
    ) external view returns (uint256) {
        uint256[] memory amounts = calculateDistributions(
            recipients,
            totalAmount
        );

        for (uint256 i = 0; i < recipients.length; i++) {
            if (recipients[i] == _recipientId) {
                return amounts[i];
            }
        }

        revert("Recipient not found in the list");
    }

    // ====================================
    // ========= Public Functions =========
    // ====================================

    /// @notice Calculates the distribution amounts for a list of recipients based on their votes
    /// @param recipients List of recipient addresses
    /// @param totalAmount Total amount to distribute among the recipients
    /// @return amounts List of amounts to distribute to each recipient
    function calculateDistributions(
        address[] calldata recipients,
        uint256 totalAmount
    ) public view returns (uint256[] memory) {
        uint256 totalVotes = 0;
        uint256[] memory amounts = new uint256[](recipients.length);

        for (uint256 i = 0; i < recipients.length; i++) {
            totalVotes += votes[recipients[i]];
        }

        require(totalVotes > 0, "Total votes should be greater than zero");

        for (uint256 i = 0; i < recipients.length; i++) {
            amounts[i] =
                (uint256(votes[recipients[i]]) * totalAmount) /
                uint256(totalVotes);
        }

        return amounts;
    }
}
