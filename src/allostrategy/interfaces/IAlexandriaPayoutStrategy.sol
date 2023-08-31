// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.19;

/// @title IAlexandriaPayoutStrategy Interface
/// @notice Interface for the Alexandria payout strategy.
interface IAlexandriaPayoutStrategy {
    /// @notice Calculates the distribution amounts for a list of recipients.
    /// @param recipients List of recipient addresses.
    /// @param totalAmount Total amount to distribute among the recipients.
    /// @return An array of amounts to distribute to each recipient.
    function calculateDistributions(
        address[] calldata recipients,
        uint256 totalAmount
    ) external view returns (uint256[] memory);

    /// @notice Retrieves the minimum donation amount.
    /// @return The minimum donation amount.
    function minimumDonation() external view returns (uint256);

    /// @notice Retrieves the cost of minting.
    /// @return The minting cost.
    function mintCost() external view returns (uint256);

    /// @notice Retrieves the payout amount for a specific recipient.
    /// @param _recipientId Address of the recipient.
    /// @param totalAmount Total amount available for distribution.
    /// @param recipients List of recipient addresses.
    /// @return The payout amount for the specified recipient.
    function getPayoutAmount(
        address _recipientId,
        uint256 totalAmount,
        address[] calldata recipients
    ) external view returns (uint256);

    /// @notice Updates the votes for a given project based on a donation amount.
    /// @param project Address of the project to update votes for.
    /// @param donationAmount Amount of the donation.
    function updateVotesForDonation(
        address project,
        uint256 donationAmount
    ) external;
}
