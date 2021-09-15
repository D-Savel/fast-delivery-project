
# Fast Delivery project

Fast Delivery project is an online express parcel delivery service. It allows the connection between shippers and deliverers. it also ensures, through the blockchain and an NFT, the tracking of the parcel (online publishing package, pick-up, delivery, time-stamping) as well as the automatic payment of the deliverer at the time of delivery.

## Using App ##

- You can access Fast Delivery App at https://fast-delivery.netlify.app/

## Getting started for local running?

Clone the repo into your project directory :

  `git clone git@github.com:D-Savel/fast-delivery-project.git`

Prepare server part adding database url and mail access using gmail (replace YOUR_GMAIL_... with your own value):

  ```sh
  cd /fast-delivery-back
  yarn
  echo 'DATABASE_URL="postgres://zhcnwanfnjpdlb:ee737b8236f938e179bd6810542e0672386d5911e9007e8eb0876e24ca7b7899@ec2-34-249-247-7.eu-west-1.compute.amazonaws.com:5432/d4rh8q9n756iq9"' > .env
  echo 'MAIL_USER="YOUR_GMAIL_ACCOUNT@gmail.com"' > .env
  echo 'MAIL_PASSWORD="YOUR_GMAIL_PASSWORD"' > .env
  yarn server
  ```

Then run Fast Delivery App:

  
  ```sh
  cd ..
  cd /fast-delivery-app
  yarn
  echo 'REACT_APP_URL_SERVER="http://localhost:3000/"' > .env
  yarn start
  ```

## Deploying smartcontract

  
  ```sh
  cd ..
  cd /fast-delivery-hardhat-project
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
  npx hardhat run scripts/un-approve-faucetContractAddress.js --network NETWORK_TEST
  ```

**Deploying FastDeliveryUser**

  ```sh
  npx hardhat run scripts/deploy-FastDeliveryUser.js --network NETWORK_TEST
  ```

**Deploying FastDeliveryNft**

  ```sh
  npx hardhat run scripts/deploy-FastDeliveryNft.js --network NETWORK_TEST
  ```




