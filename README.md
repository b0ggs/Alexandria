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
