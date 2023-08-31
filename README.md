# Alexandria Protocol

The Alexandria Protocol is a solution designed to ensure knowledge remains accessible and uncensored for future generations. Drawing inspiration from the ancient Library of Alexandria with a modern twist, leveraging decentralized technology and DAO governance.

This repository contains the codebase for the Alexandria Protocol.

## Important Links

- [Alexandria Core Protocol README](src/core/README.MD)
- [Allo AlexandriaStrategy README](/src/allostrategy/README.MD)
- [Demo Link](https://alexandria-protocol.vercel.app/)
- [Opensea Link](https://testnets.opensea.io/collection/alexandria-2)

### Smart Contracts

| Description           | Link                                                                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| AlexandriaV1          | [0xd2A83f761Cf5bFf7Fa80Af903e4E10a83888EF39](https://goerli.etherscan.io/address/0xd2A83f761Cf5bFf7Fa80Af903e4E10a83888EF39) |
| AlexandriaMint        | [0x26cd2c35c0273387a04C927ba2CCB388393d7AeE](https://goerli.etherscan.io/address/0x26cd2c35c0273387a04C927ba2CCB388393d7AeE) |
| AlexandriaOracle      | [0x2e7af1040bA919654A5A7C28Cc9Ef215dF1b5CaA](https://goerli.etherscan.io/address/0x2e7af1040bA919654A5A7C28Cc9Ef215dF1b5CaA) |
| AlexandriaData        | [0xad38733D8625B5B16A1d9fe7C7C68b4bDc4Cf727](https://goerli.etherscan.io/address/0xad38733D8625B5B16A1d9fe7C7C68b4bDc4Cf727) |
| AlexandriaDataLibrary | [0x46f49da9c4b0fd016609a8421b35472511866afb](https://goerli.etherscan.io/address/0x46f49da9c4b0fd016609a8421b35472511866afb) |

## Example of Use

This is an example use from the Alexandria Core Protocol README for the AlexandriaV1 contract:

1. A depositor reserves pages for a certain book with `reservePages(bookHash, pageCount, bookURL)` function, by submitting the IPFS hash of the book, the number of pages and the URL of the book. This returns the `startPage` and `endPage` in an emitted Event. The depositor uses these in our opensource software to get the book `carURI`.
2. The depositor can then propose with `propose(carURI)` there the carURI is appended with `{id}.json` from the ERC1155 metadata schema. The proposer must pay a bond for each page they are proposing.
3. Someone else can dispute this proposed book with `dispute(proposedBookId)`, if they think that the book should not be minted as an NFT. The disputer must pay an equal sized bond to the proposer.
4. Disputes are currently resolved in [SnapShot](https://snapshot.org/#/) with an integration of [oSnap by UMA](https://docs.uma.xyz/developers/osnap) for a [Gnosis Safe](https://safe.global/). This allows for decentralization as users can then vote with their NFTs and the oSnap plug-in automatically triggers the call of the settle function. The dispute is settled by the manager (oSnap through the SAFE) of the contract with the `settle(bookId, isPassed)` function. The winner of the dispute gets their bond back and a % of the other bond. Note that in future versions we will be moving governance on-chain.
5. If the book passes the dispute, then it will be available to mint into an NFT with `mintPage()`. The function `mintPageDonation(msgSender)` can be used to mint on behalf of a donor, meant to be only used with the Alexandria Allo strategy.
6. These NFTs can be burnt to claim their treasury backing with `claimAndBurn(tokenId)`.

# Open-source Software for Hashing a PDF URL

## Install

```
$ brew install jq
$ brew install imagemagick
$ nvm install v18.17.1
$ nvm use v18.17.1
$ cd packages/cli
$ yarn
```

You must also copy `env.example` to `.env` and populate the `NFT_STORAGE_KEY` with an [nft.storage](https://nft.storage) API key.

## Usage

1. Navigate to https://archive.org and find a PDF for a book (e.g. https://archive.org/download/theletterofarist00thacuoft/theletterofarist00thacuoft.pdf)
1. Run `make reserve-and-propose` with the URL and a description to download the PDF, generate a hash, and create and upload NFT images
   ```{bash}
   $ cd packages/cli
   $ make reserve-and-propose URL=https://archive.org/download/theletterofarist00thacuoft/theletterofarist00thacuoft.pdf \
                   DESCRIPTION='The letter of Aristeas' \
                   START_PAGE=0 \
                   END_PAGE=68
   ...
   reserve url: https://archive.org/download/theletterofarist00thacuoft/theletterofarist00thacuoft.pdf
   reserve book hash: 0xa4dde636154771510ae537862844c8049e2b1be99d57907459b1e1330a6eddd9
   reserve page count: 68
   propose car uri: https://bafybeig43veinnxvi56nsrhmvgearhmyoputwgzazf3eqqadwjujl3i7we.ipfs.nftstorage.link/{id}.json
   ```
1. Enter the reserve url, book hash, page count [here](http://localhost:3000)
1. Enter the value of the propose car uri [here](http://localhost:3000)
