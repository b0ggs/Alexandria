const contracts = {
  5: [
    {
      chainId: "5",
      name: "goerli",
      contracts: {
        AlexandriaData: {
          address: "0xb04ee23A0CB01C9828DC20391A7fDB51445f3dB0",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "message",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "bookId",
                  type: "uint256",
                },
              ],
              name: "BookDoesNotExist",
              type: "error",
            },
            {
              inputs: [],
              name: "NotAuthorized",
              type: "error",
            },
            {
              inputs: [],
              name: "OnlyManagerCanCall",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "string",
                  name: "dictionaryName",
                  type: "string",
                },
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  indexed: false,
                  internalType: "struct Book",
                  name: "book",
                  type: "tuple",
                },
              ],
              name: "BookAddedToDictionary",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  indexed: false,
                  internalType: "struct Book",
                  name: "book",
                  type: "tuple",
                },
              ],
              name: "BookAddedToQueue",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "string",
                  name: "dictionaryName",
                  type: "string",
                },
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  indexed: false,
                  internalType: "struct Book",
                  name: "book",
                  type: "tuple",
                },
              ],
              name: "BookRemovedFromDictionary",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "bookId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "disputer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timestamp",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "pageCount",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "carURI",
                  type: "string",
                },
              ],
              name: "DisputeAddedToMintQueue",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "oldPeriod",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "newPeriod",
                  type: "uint32",
                },
              ],
              name: "DisputePeriodUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "string",
                  name: "message",
                  type: "string",
                },
              ],
              name: "MintQueueUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "oldestBookId",
                  type: "uint256",
                },
              ],
              name: "OldestBookIdSet",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "oldestBookId",
                  type: "uint256",
                },
              ],
              name: "OldestBookIdUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalIds",
                  type: "uint256",
                },
              ],
              name: "PageArrayUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "uri",
                  type: "string",
                },
              ],
              name: "TokenURISet",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "_book",
                  type: "tuple",
                },
              ],
              name: "addBookToDisputeDictionary",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "_book",
                  type: "tuple",
                },
              ],
              name: "addBookToProposedDictionary",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "_disputedBook",
                  type: "tuple",
                },
              ],
              name: "addResolvedDisputeToMintQueue",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
              ],
              name: "bookExistsinDisputeDictionary",
              outputs: [
                {
                  internalType: "bool",
                  name: "exists",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "bookMintQueue",
              outputs: [
                {
                  internalType: "uint256",
                  name: "head",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "tail",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "totalIds",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "defaultDisputePeriod",
              outputs: [
                {
                  internalType: "uint32",
                  name: "",
                  type: "uint32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "disputeDictionary",
              outputs: [
                {
                  internalType: "uint256",
                  name: "oldestBookId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "count",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getBooksInQueue",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
              ],
              name: "getDisputeBookForQueue",
              outputs: [
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getMintBook",
              outputs: [
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getPagesInMintQueue",
              outputs: [
                {
                  internalType: "uint256",
                  name: "pages",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
              ],
              name: "getProposedBookForDispute",
              outputs: [
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "isProposed",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "manager",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "mintManager",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "oracleManager",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "proposedDictionary",
              outputs: [
                {
                  internalType: "uint256",
                  name: "oldestBookId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "count",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "_disputedBook",
                  type: "tuple",
                },
              ],
              name: "removeFromDisputeDictionary",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "_proposedBook",
                  type: "tuple",
                },
              ],
              name: "removeFromProposedDictionary",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "bookHash",
                  type: "bytes32",
                },
                {
                  internalType: "bool",
                  name: "value",
                  type: "bool",
                },
              ],
              name: "setIsProposed",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_manager",
                  type: "address",
                },
              ],
              name: "setManager",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_newMintManager",
                  type: "address",
                },
              ],
              name: "setMintManager",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "_book",
                  type: "tuple",
                },
              ],
              name: "setOldestBookInProposedDictionary",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_newOracleManager",
                  type: "address",
                },
              ],
              name: "setOracleManager",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint32",
                  name: "newDisputePeriod",
                  type: "uint32",
                },
              ],
              name: "updateDisputePeriod",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "updateMintQueue",
              outputs: [
                {
                  internalType: "bool",
                  name: "isUpdated",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
              ],
              name: "updateOldestBookIdInProposedDictionary",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "pages",
                  type: "uint256",
                },
              ],
              name: "updatePageQueue",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        AlexandriaMint: {
          address: "0x88592b0273178C092067921019725d6dA354814a",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_dataAddress",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
              ],
              name: "NFTMintedWithCurrentID",
              type: "error",
            },
            {
              inputs: [],
              name: "NoPagesInQueue",
              type: "error",
            },
            {
              inputs: [],
              name: "NotManager",
              type: "error",
            },
            {
              inputs: [],
              name: "UriAlreadySet",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "ApprovalForAll",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timestamp",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "carURI",
                  type: "string",
                },
              ],
              name: "PageMinted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256[]",
                  name: "ids",
                  type: "uint256[]",
                },
                {
                  indexed: false,
                  internalType: "uint256[]",
                  name: "values",
                  type: "uint256[]",
                },
              ],
              name: "TransferBatch",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "TransferSingle",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "string",
                  name: "value",
                  type: "string",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
              ],
              name: "URI",
              type: "event",
            },
            {
              inputs: [],
              name: "NAME",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "SYMBOL",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "_uris",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "accounts",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "ids",
                  type: "uint256[]",
                },
              ],
              name: "balanceOfBatch",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "burnTokens",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "data",
              outputs: [
                {
                  internalType: "contract AlexandriaData",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
              ],
              name: "exists",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
              ],
              name: "isApprovedForAll",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "manager",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
              ],
              name: "mintPage",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "paymentAmount",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct PayoutDetail",
                  name: "",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "bookID",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256[]",
                  name: "ids",
                  type: "uint256[]",
                },
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "safeBatchTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "setApprovalForAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_manager",
                  type: "address",
                },
              ],
              name: "setManager",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalNFTs",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
              ],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "uri",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        AlexandriaOracle: {
          address: "0x89b90B17aB50069Ab2D723Dd37b366D32262128d",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_dataAddress",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "bookHash",
                  type: "bytes32",
                },
              ],
              name: "BookAlreadyProposed",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "bookHash",
                  type: "bytes32",
                },
              ],
              name: "BookAlreadyReserved",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint32",
                  name: "timestamp",
                  type: "uint32",
                },
              ],
              name: "DisputeNoExist",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint32",
                  name: "bookTimestamp",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "defaultDisputePeriod",
                  type: "uint32",
                },
              ],
              name: "DisputeTimeExpired",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "nextPageIDToUse",
                  type: "uint256",
                },
                {
                  internalType: "uint16",
                  name: "pageCount",
                  type: "uint16",
                },
              ],
              name: "IdOverflow",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "pageCount",
                  type: "uint16",
                },
                {
                  internalType: "uint256",
                  name: "length",
                  type: "uint256",
                },
              ],
              name: "IdsNotEqualPagecount",
              type: "error",
            },
            {
              inputs: [],
              name: "NotManager",
              type: "error",
            },
            {
              inputs: [],
              name: "ProposalAlreadyDisputed",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint32",
                  name: "timestamp",
                  type: "uint32",
                },
              ],
              name: "ProposalNoExist",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "message",
                  type: "string",
                },
              ],
              name: "ReservationError",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "bookId",
                  type: "uint256",
                },
              ],
              name: "BookAddedToMintQueue",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "bookHash",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "bookId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "startPage",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "endPage",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "bookBondAmount",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "proposer",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "disputer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timestamp",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "pageCount",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "carURI",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "bookURL",
                  type: "string",
                },
              ],
              name: "BookDisputed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "bookHash",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "bookId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "startPage",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "endPage",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "bookBondAmount",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "proposer",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "disputer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timestamp",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "pageCount",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "carURI",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "bookURL",
                  type: "string",
                },
              ],
              name: "BookProposed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "reservationId",
                  type: "uint256",
                },
              ],
              name: "ReservationExpired",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "bookHash",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "reserver",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "reservationId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "startPage",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "endPage",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "bookBondAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "pageCount",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "bookURL",
                  type: "string",
                },
              ],
              name: "ReservationMade",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "bookId",
                  type: "uint256",
                },
              ],
              name: "addToMintQueueAfterDispute",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "checkAndSlashExpiredReservations",
              outputs: [
                {
                  internalType: "uint256",
                  name: "bondsSlashed",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "data",
              outputs: [
                {
                  internalType: "contract AlexandriaData",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "proposedBookId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "disputer",
                  type: "address",
                },
              ],
              name: "dispute",
              outputs: [
                {
                  internalType: "uint256",
                  name: "bookBondAmount",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "bookId",
                  type: "uint256",
                },
              ],
              name: "getDisputedBook",
              outputs: [
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "hasReserved",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "isReserved",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "manager",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "nextBookId",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "nextPageIDToUse",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "nextReservationId",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "oldestReservationId",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "carURI",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "msgSender",
                  type: "address",
                },
              ],
              name: "propose",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "reservationDuration",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "reservations",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "bookHash",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "reserver",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "startPage",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "endPage",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "bookBondAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint16",
                  name: "pageCount",
                  type: "uint16",
                },
                {
                  internalType: "string",
                  name: "bookURL",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_bookHash",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "pageCount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "bookBondAmount",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "msgSender",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "bookURL",
                  type: "string",
                },
              ],
              name: "reservePages",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_manager",
                  type: "address",
                },
              ],
              name: "setManager",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        AlexandriaV1: {
          address: "0x182Ef3cf19Fd86D5f090DC49bC853bf2692b9679",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_dataAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_oracleAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_mintAddress",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "requestedAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "currentBalance",
                  type: "uint256",
                },
              ],
              name: "ExceedsTreasuryBalance",
              type: "error",
            },
            {
              inputs: [],
              name: "NotManager",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "sentAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "requiredAmount",
                  type: "uint256",
                },
              ],
              name: "PaymentError",
              type: "error",
            },
            {
              inputs: [],
              name: "TransferFailed",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint8",
                  name: "oldPercentage",
                  type: "uint8",
                },
                {
                  indexed: false,
                  internalType: "uint8",
                  name: "newPercentage",
                  type: "uint8",
                },
              ],
              name: "BonusPercentageUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "claimer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "backingValue",
                  type: "uint256",
                },
              ],
              name: "PageBurned",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "payer",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "sentAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "requiredAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "refundedAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "paymentType",
                  type: "string",
                },
              ],
              name: "PaymentProcessed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint128",
                  name: "oldBond",
                  type: "uint128",
                },
                {
                  indexed: false,
                  internalType: "uint128",
                  name: "newBond",
                  type: "uint128",
                },
              ],
              name: "ProposeBondUpdated",
              type: "event",
            },
            {
              inputs: [],
              name: "AlexandriaAllo",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "backingPerToken",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "bondBalance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "bonusPercentage",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "checkAndSlashExpiredReservations",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "claimAndBurn",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "data",
              outputs: [
                {
                  internalType: "contract AlexandriaData",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "proposedBookId",
                  type: "uint256",
                },
              ],
              name: "dispute",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
              ],
              name: "getBookFromProposedDictionary",
              outputs: [
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getTokenUri",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "manager",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "mint",
              outputs: [
                {
                  internalType: "contract AlexandriaMint",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "mintPage",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "msgSender",
                  type: "address",
                },
              ],
              name: "mintPageDonation",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "oracle",
              outputs: [
                {
                  internalType: "contract AlexandriaOracle",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "carURI",
                  type: "string",
                },
              ],
              name: "propose",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "proposeBond",
              outputs: [
                {
                  internalType: "uint128",
                  name: "",
                  type: "uint128",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "bookHash",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "pageCount",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "bookURL",
                  type: "string",
                },
              ],
              name: "reservePages",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_manager",
                  type: "address",
                },
              ],
              name: "setManager",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "bookId",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "isPassed",
                  type: "bool",
                },
              ],
              name: "settle",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "settlePercentage",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "slashPercentage",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "treasuryBalance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint8",
                  name: "newBonusPercentage",
                  type: "uint8",
                },
              ],
              name: "updateBonusPercentage",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "updateMintQueue",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint128",
                  name: "newProposeBond",
                  type: "uint128",
                },
              ],
              name: "updateProposeBond",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint8",
                  name: "newSettlePercentage",
                  type: "uint8",
                },
              ],
              name: "updateSettlePercentage",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint8",
                  name: "newSlashPercentage",
                  type: "uint8",
                },
              ],
              name: "updateSlashPercentage",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "wasDisputed",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "address payable",
                  name: "recipient",
                  type: "address",
                },
              ],
              name: "withdrawFromTreasury",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        AlexandriaData: {
          address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "message",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "bookId",
                  type: "uint256",
                },
              ],
              name: "BookDoesNotExist",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "string",
                  name: "dictionaryName",
                  type: "string",
                },
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  indexed: false,
                  internalType: "struct Book",
                  name: "book",
                  type: "tuple",
                },
              ],
              name: "BookAddedToDictionary",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  indexed: false,
                  internalType: "struct Book",
                  name: "book",
                  type: "tuple",
                },
              ],
              name: "BookAddedToQueue",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "string",
                  name: "dictionaryName",
                  type: "string",
                },
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  indexed: false,
                  internalType: "struct Book",
                  name: "book",
                  type: "tuple",
                },
              ],
              name: "BookRemovedFromDictionary",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "bookId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "disputer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timestamp",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "pageCount",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "carURI",
                  type: "string",
                },
              ],
              name: "DisputeAddedToMintQueue",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "oldPeriod",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "newPeriod",
                  type: "uint32",
                },
              ],
              name: "DisputePeriodUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "string",
                  name: "message",
                  type: "string",
                },
              ],
              name: "MintQueueUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "oldestBookId",
                  type: "uint256",
                },
              ],
              name: "OldestBookIdSet",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "oldestBookId",
                  type: "uint256",
                },
              ],
              name: "OldestBookIdUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalIds",
                  type: "uint256",
                },
              ],
              name: "PageArrayUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "uri",
                  type: "string",
                },
              ],
              name: "TokenURISet",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "_book",
                  type: "tuple",
                },
              ],
              name: "addBookToDisputeDictionary",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "_book",
                  type: "tuple",
                },
              ],
              name: "addBookToProposedDictionary",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "_disputedBook",
                  type: "tuple",
                },
              ],
              name: "addResolvedDisputeToMintQueue",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
              ],
              name: "bookExistsinDisputeDictionary",
              outputs: [
                {
                  internalType: "bool",
                  name: "exists",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "bookMintQueue",
              outputs: [
                {
                  internalType: "uint256",
                  name: "head",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "tail",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "totalIds",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "defaultDisputePeriod",
              outputs: [
                {
                  internalType: "uint32",
                  name: "",
                  type: "uint32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "disputeDictionary",
              outputs: [
                {
                  internalType: "uint256",
                  name: "oldestBookId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "count",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getBooksInQueue",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
              ],
              name: "getDisputeBookForQueue",
              outputs: [
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getMintBook",
              outputs: [
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getPagesInMintQueue",
              outputs: [
                {
                  internalType: "uint256",
                  name: "pages",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
              ],
              name: "getProposedBookForDispute",
              outputs: [
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "isProposed",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "manager",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "mintManager",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "oracleManager",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "proposedDictionary",
              outputs: [
                {
                  internalType: "uint256",
                  name: "oldestBookId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "count",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "_disputedBook",
                  type: "tuple",
                },
              ],
              name: "removeFromDisputeDictionary",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "_proposedBook",
                  type: "tuple",
                },
              ],
              name: "removeFromProposedDictionary",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "bookHash",
                  type: "bytes32",
                },
                {
                  internalType: "bool",
                  name: "value",
                  type: "bool",
                },
              ],
              name: "setIsProposed",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_manager",
                  type: "address",
                },
              ],
              name: "setManager",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_newMintManager",
                  type: "address",
                },
              ],
              name: "setMintManager",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "_book",
                  type: "tuple",
                },
              ],
              name: "setOldestBookInProposedDictionary",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_newOracleManager",
                  type: "address",
                },
              ],
              name: "setOracleManager",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint32",
                  name: "newDisputePeriod",
                  type: "uint32",
                },
              ],
              name: "updateDisputePeriod",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "updateMintQueue",
              outputs: [
                {
                  internalType: "bool",
                  name: "isUpdated",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
              ],
              name: "updateOldestBookIdInProposedDictionary",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "pages",
                  type: "uint256",
                },
              ],
              name: "updatePageQueue",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        AlexandriaMint: {
          address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_dataAddress",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
              ],
              name: "NFTMintedWithCurrentID",
              type: "error",
            },
            {
              inputs: [],
              name: "NoPagesInQueue",
              type: "error",
            },
            {
              inputs: [],
              name: "UriAlreadySet",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "ApprovalForAll",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timestamp",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "carURI",
                  type: "string",
                },
              ],
              name: "PageMinted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256[]",
                  name: "ids",
                  type: "uint256[]",
                },
                {
                  indexed: false,
                  internalType: "uint256[]",
                  name: "values",
                  type: "uint256[]",
                },
              ],
              name: "TransferBatch",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "TransferSingle",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "string",
                  name: "value",
                  type: "string",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
              ],
              name: "URI",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "_uris",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "accounts",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "ids",
                  type: "uint256[]",
                },
              ],
              name: "balanceOfBatch",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "burnTokens",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "data",
              outputs: [
                {
                  internalType: "contract AlexandriaData",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
              ],
              name: "exists",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
              ],
              name: "isApprovedForAll",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "manager",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
              ],
              name: "mintPage",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "paymentAmount",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct PayoutDetail",
                  name: "",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "bookID",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256[]",
                  name: "ids",
                  type: "uint256[]",
                },
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "safeBatchTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "setApprovalForAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_manager",
                  type: "address",
                },
              ],
              name: "setManager",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalNFTs",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
              ],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "uri",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        AlexandriaOracle: {
          address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_dataAddress",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "bookHash",
                  type: "bytes32",
                },
              ],
              name: "BookAlreadyProposed",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "bookHash",
                  type: "bytes32",
                },
              ],
              name: "BookAlreadyReserved",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint32",
                  name: "timestamp",
                  type: "uint32",
                },
              ],
              name: "DisputeNoExist",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint32",
                  name: "bookTimestamp",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "defaultDisputePeriod",
                  type: "uint32",
                },
              ],
              name: "DisputeTimeExpired",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "nextPageIDToUse",
                  type: "uint256",
                },
                {
                  internalType: "uint16",
                  name: "pageCount",
                  type: "uint16",
                },
              ],
              name: "IdOverflow",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "pageCount",
                  type: "uint16",
                },
                {
                  internalType: "uint256",
                  name: "length",
                  type: "uint256",
                },
              ],
              name: "IdsNotEqualPagecount",
              type: "error",
            },
            {
              inputs: [],
              name: "ProposalAlreadyDisputed",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint32",
                  name: "timestamp",
                  type: "uint32",
                },
              ],
              name: "ProposalNoExist",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "message",
                  type: "string",
                },
              ],
              name: "ReservationError",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "bookId",
                  type: "uint256",
                },
              ],
              name: "BookAddedToMintQueue",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "bookHash",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "bookId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "startPage",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "endPage",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "bookBondAmount",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "proposer",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "disputer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timestamp",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "pageCount",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "carURI",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "bookURL",
                  type: "string",
                },
              ],
              name: "BookDisputed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "bookHash",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "bookId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "startPage",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "endPage",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "bookBondAmount",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "proposer",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "disputer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timestamp",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "pageCount",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "carURI",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "bookURL",
                  type: "string",
                },
              ],
              name: "BookProposed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "reservationId",
                  type: "uint256",
                },
              ],
              name: "ReservationExpired",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "bookHash",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "reserver",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "reservationId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "startPage",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "endPage",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "bookBondAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "pageCount",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "bookURL",
                  type: "string",
                },
              ],
              name: "ReservationMade",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "bookId",
                  type: "uint256",
                },
              ],
              name: "addToMintQueueAfterDispute",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "checkAndSlashExpiredReservations",
              outputs: [
                {
                  internalType: "uint256",
                  name: "bondsSlashed",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "data",
              outputs: [
                {
                  internalType: "contract AlexandriaData",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "proposedBookId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "disputer",
                  type: "address",
                },
              ],
              name: "dispute",
              outputs: [
                {
                  internalType: "uint256",
                  name: "bookBondAmount",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "bookId",
                  type: "uint256",
                },
              ],
              name: "getDisputedBook",
              outputs: [
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "hasReserved",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "isReserved",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "manager",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "nextBookId",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "nextPageIDToUse",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "nextReservationId",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "oldestReservationId",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "carURI",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "msgSender",
                  type: "address",
                },
              ],
              name: "propose",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "reservationDuration",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "reservations",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "bookHash",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "reserver",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "startPage",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "endPage",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "bookBondAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint16",
                  name: "pageCount",
                  type: "uint16",
                },
                {
                  internalType: "string",
                  name: "bookURL",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_bookHash",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "pageCount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "bookBondAmount",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "msgSender",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "bookURL",
                  type: "string",
                },
              ],
              name: "reservePages",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_manager",
                  type: "address",
                },
              ],
              name: "setManager",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        AlexandriaV1: {
          address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_dataAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_oracleAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_mintAddress",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "requestedAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "currentBalance",
                  type: "uint256",
                },
              ],
              name: "ExceedsTreasuryBalance",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "sentAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "requiredAmount",
                  type: "uint256",
                },
              ],
              name: "PaymentError",
              type: "error",
            },
            {
              inputs: [],
              name: "TransferFailed",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint8",
                  name: "oldPercentage",
                  type: "uint8",
                },
                {
                  indexed: false,
                  internalType: "uint8",
                  name: "newPercentage",
                  type: "uint8",
                },
              ],
              name: "BonusPercentageUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "claimer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "backingValue",
                  type: "uint256",
                },
              ],
              name: "PageBurned",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "payer",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "sentAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "requiredAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "refundedAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "paymentType",
                  type: "string",
                },
              ],
              name: "PaymentProcessed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint128",
                  name: "oldBond",
                  type: "uint128",
                },
                {
                  indexed: false,
                  internalType: "uint128",
                  name: "newBond",
                  type: "uint128",
                },
              ],
              name: "ProposeBondUpdated",
              type: "event",
            },
            {
              inputs: [],
              name: "AlexandriaAllo",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "backingPerToken",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "bondBalance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "bonusPercentage",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "checkAndSlashExpiredReservations",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "claimAndBurn",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "data",
              outputs: [
                {
                  internalType: "contract AlexandriaData",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "proposedBookId",
                  type: "uint256",
                },
              ],
              name: "dispute",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_bookId",
                  type: "uint256",
                },
              ],
              name: "getBookFromProposedDictionary",
              outputs: [
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "bookHash",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bookId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "startPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "endPage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bookBondAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposer",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "timestamp",
                      type: "uint32",
                    },
                    {
                      internalType: "uint16",
                      name: "pageCount",
                      type: "uint16",
                    },
                    {
                      internalType: "string",
                      name: "carURI",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bookURL",
                      type: "string",
                    },
                  ],
                  internalType: "struct Book",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getTokenUri",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "manager",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "mint",
              outputs: [
                {
                  internalType: "contract AlexandriaMint",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "mintPage",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "msgSender",
                  type: "address",
                },
              ],
              name: "mintPageDonation",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "oracle",
              outputs: [
                {
                  internalType: "contract AlexandriaOracle",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "carURI",
                  type: "string",
                },
              ],
              name: "propose",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "proposeBond",
              outputs: [
                {
                  internalType: "uint128",
                  name: "",
                  type: "uint128",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "bookHash",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "pageCount",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "bookURL",
                  type: "string",
                },
              ],
              name: "reservePages",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_manager",
                  type: "address",
                },
              ],
              name: "setManager",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "bookId",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "isPassed",
                  type: "bool",
                },
              ],
              name: "settle",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "settlePercentage",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "slashPercentage",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "treasuryBalance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint8",
                  name: "newBonusPercentage",
                  type: "uint8",
                },
              ],
              name: "updateBonusPercentage",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "updateMintQueue",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint128",
                  name: "newProposeBond",
                  type: "uint128",
                },
              ],
              name: "updateProposeBond",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint8",
                  name: "newSettlePercentage",
                  type: "uint8",
                },
              ],
              name: "updateSettlePercentage",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint8",
                  name: "newSlashPercentage",
                  type: "uint8",
                },
              ],
              name: "updateSlashPercentage",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "wasDisputed",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "address payable",
                  name: "recipient",
                  type: "address",
                },
              ],
              name: "withdrawFromTreasury",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
