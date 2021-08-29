export const FastDeliveryNftAddress = '0x7c0e7b59cD5fAbaD5640651748792C799d5C94E9'

export const FastDeliveryNftAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenContractAddress_",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "deliveryId_",
        "type": "uint256"
      }
    ],
    "name": "DeliveryInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "enum FastDeliveryNft.Status",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "parcelSender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "deliveryman",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "firstNameRecipient",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "lastNameRecipient",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "addressXRecipient",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "addressYRecipient",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "addressInfoRecipient",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "telRecipient",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "mailRecipient",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "deliveryDay",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "deliveryAmount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "deliveryCode",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "onlineTimestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "attributionTimestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "collectTimestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deliveredTimestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct FastDeliveryNft.Delivery",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "deliveryId_",
        "type": "uint256"
      }
    ],
    "name": "attributeDelivery",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "deliveryId_",
        "type": "uint256"
      }
    ],
    "name": "cancelDelivery",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "deliveryId_",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "deliverycode_",
        "type": "string"
      }
    ],
    "name": "collectDelivery",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "firstNameRecipient_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "lastNameRecipient_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "addressXRecipient_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "addressYRecipient_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "addressInfoRecipient_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "telRecipient_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "mailRecipient_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "deliveryDay_",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "deliveryAmount_",
        "type": "uint256"
      }
    ],
    "name": "createDelivery",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "deliveryId_",
        "type": "uint256"
      }
    ],
    "name": "deleteDelivery",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "deliveryId_",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "code_",
        "type": "string"
      }
    ],
    "name": "delivered",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "getDeliveriesIdByAddress",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "status",
    "outputs": [
      {
        "internalType": "enum FastDeliveryNft.Status",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]