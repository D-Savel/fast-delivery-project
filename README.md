
# Fast Delivery project

Fast Delivery project is an online express parcel delivery service. It allows the connection between shippers and deliverers. it also ensures, through the blockchain and an NFT, the tracking of the parcel (online publishing package, pick-up, delivery, time-stamping) as well as the automatic payment of the deliverer at the time of delivery.

## DApp screenshot

**Account registration**

![alt Account registration](https://github.com/D-Savel/fast-delivery-project/blob/main/Screenshots/userRegisterBoardScreenshot.png?raw=true)

**Parcel sender board**

![alt parcel sender board](https://github.com/D-Savel/fast-delivery-project/blob/main/Screenshots/parcelSenderBoardScreenshot.png?raw=true)

**Add new delivery for parcel Sender**

![alt parcel sender board](https://github.com/D-Savel/fast-delivery-project/blob/main/Screenshots/addNewDeliveryScreenshot.png?raw=true)

**Deliveryman board**

![alt parcel sender board](https://github.com/D-Savel/fast-delivery-project/blob/main/Screenshots/DeliverymanBoardScreenshot.png?raw=true)

**For using App you must have MetaMask extension installed and connected to kovan, rinkeby or ropsten test network.**

## Using App ##

- You can access Fast Delivery App at https://fast-delivery.netlify.app/

## Getting started for local running

Clone the repo into your project directory :

  `git clone git@github.com:D-Savel/fast-delivery-project.git`

Then run Fast Delivery App:
  
  ```sh
  cd fast-delivery-project
  cd fast-delivery-app
  yarn
  echo 'REACT_APP_URL_SERVER="https://fast-delivery-back.herokuapp.com"' > .env
  yarn start
  ```

## Deploying smartcontract
  
  ```sh
  cd fast-delivery-project
  cd fast-delivery-hardhat-project
  yarn
  ```

*For deploying choose your test network :*
- Replace NETWORK_TEST by ropsten or rinkeby or kovan ...

**Deploying DaidToken**

  ```sh
  npx hardhat run scripts/deploy-DaidToken.js --network NETWORK_TEST
  ```

**Deploying Faucet**

  ```sh
  npx hardhat run scripts/deploy-Faucet.js --network NETWORK_TEST
  ```

**Aprove faucet smartcontract**

 Edit run-approve-faucetContractAddress.js
  and replace smartcontract address

  ```sh
  const TOKENCONTRACTADDRESS = 'YOUR_DaidToken_CONTRACT_ADDRESS'
  const FAUCETCONTRACTADDRESS = 'YOUR_Faucet_CONTRACT_ADDRESS'
  ```

  Then

  ```sh
  npx hardhat run scripts/run-approve-faucetContractAddress.js --network NETWORK_TEST
  ```

**Deploying FastDeliveryUser**

  ```sh
  npx hardhat run scripts/deploy-FastDeliveryUser.js --network NETWORK_TEST
  ```

**Deploying FastDeliveryNft**

  ```sh
  npx hardhat run scripts/deploy-FastDeliveryNft.js --network NETWORK_TEST
  ```




