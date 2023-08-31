# Alexandria Strategy for Allo Protocol

---

## Overview

Alexandria Strategy for Allo Protocol, allows for the integration of minting Non-Fungible Tokens (NFTs) on Alexandria as an Allo strategy.

It essentially enables donations to any projects in the Project Registry in return for PAGE NFTs.

This model motivates further donations by permitting any address registered as a recipient to receive donations. The more donations a project receives, the more it indicates its popularity and value, thus attracting more funds.

## Payout Strategies

A key part of the Alexandria Strategy for Allo Protocol is defining how funds should be distributed among registered recipients. This is specified through a Payout Strategy which follows the `IAlexandriaPayoutStrategy` interface.

### IAlexandriaPayoutStrategy Interface

Here is a brief overview of the `IAlexandriaPayoutStrategy` interface's methods:

- **calculateDistributions**: Calculates how to distribute a total amount among a list of recipients.
- **minimumDonation**: Specifies the minimum donation amount.
- **mintCost**: Specifies the cost of minting a NFT.
- **getPayoutAmount**: Retrieves the payout amount for a specific recipient.
- **updateVotesForDonation**: Updates votes for a given project based on a donation amount.

### Implemented Payout Strategies

Currently, two payout strategies have been implemented as examples:

- **AlexandriaQVPayout**: This strategy uses Quadratic Voting (QV) to decide the distribution amounts.

- **AlexandriaProportionalPayout**: This strategy distributes funds proportionally based on the donations received from users.

### Creating a Custom Payout Strategy

The modularity of this architecture allows you to create custom payout strategies that can fulfill unique requirements of your own protocol or use case. Below are steps of how you can implement this:

- Create a new contract that implements the `IAlexandriaPayoutStrategy` interface.
- Each method in your contract should have its own logic that suits your distribution criteria.
- Once your contract is ready and tested, you can pass its address into the `setPayoutStrategy` function of the `AlexandriaStrategy` contract.
- Once the payout strategy is updated with your contract's address, the `AlexandriaStrategy` will use your custom logic to allocate and distribute the funds.

This flexibility in choosing a `PayoutStrategy` provides space for innovation. It enables the creation of unique token economic models and incentive structures within the Allo Protocol. You're encouraged to experiment with various approaches and contribute your own strategies to the community.

## Main AlexandriaStrategy Features

- **Initialize Strategy**: Define the pool id, whether the donations should go to registered recipients, the opening and closing times for both registration and allocation.

- **Registration**: Register a new recipient. The sender must be a registered profile in IRegistry.

- **Donation and Minting**: Enable users to make a contribution to a registered project and minting an NFT. The mint cost and the minimum donation are determined by the payout strategy. Note: mint cost should be inherited from AlexandriaV1.

- **Funding Strategy Pool**: As a pool manager, one can add funds to a strategy pool.

- **Set Payout Strategy**: Update the allocation of funds to recipients payouts.

- **Pool Withdrawal**: As pool manager,one can withdraw a specified amount from the strategy pool.

- **Distribute Funds**: Distribute funds to registered recipients. This can be done once allocation period is over.

## Main AlexandriaStrategy Initial Setup

When deploying the contract, the following parameters must be set:

- The address of the Allo contract.
- The name of the strategy.
- The address of the initial payout strategy.
- The address of the Alexandria contract.

For example: `AlexandriaStrategy(0x123..., "My Strategy", 0x456..., 0x789...)`

## Contributing

We encourage public contributions! Please feel free to submit a pull request.
