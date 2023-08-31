# Alexandria Protocol: AlexandriaV1 Contract

The `AlexandriaV1` contract is the main contract for the Alexandria protocol, integrating AlexandriaDataLibrary, AlexandriaData, AlexandriaOracle and AlexandriaMint. It's a decentralized platform for minting PDFs into NFTs, ensuring knowledge remains uncensored and accessible.

## How To Use

This contract can be used to propose, dispute, and settle book page proposals, as well as mint NFTs representing those book pages. Here is an example of how the contract can be used:

1. A depositor reserves pages for a certain book with `reservePages(bookHash, pageCount, bookURL)` function, by submitting the IPFS hash of the book, the number of pages and the URL of the book. This returns the `startPage` and `endPage` in an emitted Event. The depositor uses these in our opensource software to get the book `carURI`.
2. The depositor can then propose with `propose(carURI)` there the carURI is appended with `{id}.json` from the ERC1155 metadata schema. The proposer must pay a bond for each page they are proposing.
3. Someone else can dispute this proposed book with `dispute(proposedBookId)`, if they think that the book should not be minted as an NFT. The disputer must pay an equal sized bond to the proposer.
4. Disputes are currently resolved in [SnapShot](https://snapshot.org/#/) with an integration of [oSnap by UMA](https://docs.uma.xyz/developers/osnap) for a [Gnosis Safe](https://safe.global/). This allows for decentralization as users can then vote with their NFTs and the oSnap plug-in automatically triggers the call of the settle function. The dispute is settled by the manager (oSnap through the SAFE) of the contract with the `settle(bookId, isPassed)` function. The winner of the dispute gets their bond back and a % of the other bond. Note that in future versions we will be moving governance on-chain.
5. If the book passes the dispute, then it will be available to mint into an NFT with `mintPage()`. The function `mintPageDonation(msgSender)` can be used to mint on behalf of a donor, meant to be only used with the Alexandria Allo strategy.
6. These NFTs can be burnt to claim their treasury backing with `claimAndBurn(tokenId)`.

Please note to keep `updateMintQueue()` up to date by moving books from the proposed dictionaryto the mint queue, so that there are always mintable pages. The `updateMintQueue()` function should be called regularly, potentially by proposers since they earn a fee on mints.

The contract manager has the authority to change the parameters of the contract like updating the bonus percentage, slash percentage, settle percentage and propose bond with corresponding `update` functions.

## Contract Properties

| Property           | Description                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| `data`             | The main data contract holding the state of all data objects.                                   |
| `oracle`           | The oracle contract responsible for book page proposal, dispute resolution and related actions. |
| `mint`             | The minting contract responsible for creating new NFTs.                                         |
| `wasDisputed`      | Indicates whether a proposal was disputed.                                                      |
| `manager`          | Manager of the contract, having access to most of the administrative functions.                 |
| `AlexandriaAllo`   | The address used for minting tokens in the donate function.                                     |
| `treasuryBalance`  | Holds the current balance of the treasury.                                                      |
| `bondBalance`      | Holds the current balance of all proposal bonds.                                                |
| `proposeBond`      | An requirements for a new proposal.                                                             |
| `bonusPercentage`  | Percentage of the minting fee that will be paid                                                 |
| `slashPercentage`  | Percentage of bonds that get slashed for invalid information or faulty allegations.             |
| `settlePercentage` | Percentage of the reward for winning an oracle dispute.                                         |

## Events

- `BonusPercentageUpdated(oldPercentage, newPercentage)`
- `ProposeBondUpdated(oldBond, newBond)`
- `PageBurned(tokenId, claimer, backingValue)`
- `PaymentProcessed(payer, recipient, sentAmount, requiredAmount, refundedAmount, paymentType)`

## Functions

### External Functions

- `setManager(_manager)`: Sets a new manager for the contract.
- `updateMintQueue()`: Moves books from the proposed dictionary to the mint queue.
- `updateBonusPercentage(newBonusPercentage)`: Updates the bonus percentage that a proposer receives when pages are minted.
- `updateSlashPercentage(newSlashPercentage)`: Updates the percentage of bonds that get slashed.
- `updateSettlePercentage(newSettlePercentage)`: Updates the percentage of the reward for winning an oracle dispute.
- `updateProposeBond(newProposeBond)`: Updates the bond required to propose.
- `withdrawFromTreasury(amount, recipient)`: Withdraws a specified amount from the treasury.
- `checkAndSlashExpiredRes- `checkAndSlashExpiredReservations()`: Checks and slashes bonds for expired reservations.
- `propose(carURI)`: Proposes a new book.
- `settle(bookId, isPassed)`: Settles a dispute for a book.
- `reservePages(bookHash, pageCount, bookURL)`: Reserves pages for a given book hash.

### External Payable Functions

- `dispute(proposedBookId)`: Disputes a proposed book.
- `mintPage()`: Mints a page as an ERC1155 NFT
- `mintPageDonation(msgSender)`: Mints a page as an ERC1155 NFT on behalf of a donor.

### External View Functions

- `getTokenUri(tokenId)`: Fetches the URI of a token.
- `getBookFromProposedDictionary(_bookId)`: Fetches a book from the proposed dictionary.

### Public Functions

- `claimAndBurn(tokenId)`: A token holder can claim the treasury backing of a token and burn the token itself.

### Public View Functions

- `backingPerToken()`: Calculates the treasury balance per token.

## Modifiers

- `onlyManager`
- `onlyAllo`

## Future Work

Here are future enhancements and features planned for subsequent versions of the contract:

1. **On-chain Governance Integration** - Update the contract system to be managed via on-chain governance, allowing decentralized control over disputes, treasury allocation, and contract updates.
2. **Incentive Structure Update** - Revised incentives for proposing and minting pages to provide more sustainable and fair rewards.
3. **Better Minting & Burning** - Addition of new features that give users and contract managers better control over the minting process (e.g. integrate ERC1115 batchMint and batchBurn).

## License

This contract is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contributors

This contract was created by the Alexandria team. Contributions are welcomed! Please feel free to submit a pull request or open an issue on our repository.

## Future Work

Future versions of the contract may include updating the incentive structure, adding new features for better control of minting, and further optimization of current functionalities.

### Suggestions for Improvement

Feedback is highly welcomed. If you have suggestions for ways to improve this contract, or have identified potential weak spots, kindly [create an issue in the contract's Github repository](https://github.com/alexandria).
