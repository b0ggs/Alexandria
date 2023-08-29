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