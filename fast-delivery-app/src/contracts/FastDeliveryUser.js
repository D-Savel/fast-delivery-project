export const FastDeliveryUserAddress = '0x8241e08717017E5Df4bD192c214e81f33C5fcB3C'

export const FastDeliveryUserAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "firstName_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "lastName_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "companyAddress_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "companySiren_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "addressInfo_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "tel_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "mail_",
        "type": "string"
      }
    ],
    "name": "deliverymanRegister",
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
        "name": "userAddress_",
        "type": "address"
      }
    ],
    "name": "getUserInfo",
    "outputs": [
      {
        "components": [
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
            "name": "firstName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "lastName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "addressXParcelSender",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "addressYParcelSender",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "companyAddress",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "companySiren",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "addressInfo",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tel",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "mail",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "registerTimestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct FastDeliveryUser.User",
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
        "name": "userAddress_",
        "type": "address"
      }
    ],
    "name": "getUserType",
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
        "internalType": "string",
        "name": "firstName_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "lastName_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "addressXParcelSender_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "addressYParcelSender_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "addressInfo_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "tel_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "mail_",
        "type": "string"
      }
    ],
    "name": "parcelSenderRegister",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
