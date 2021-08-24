/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
const hre = require('hardhat');
const { deployed } = require('./deployed');

const TOKENCONTRACTADDRESS = '0xb3e98C53b4Bc736588BAb19E03A08fE23157499c'

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');


  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  // We get the contract to deploy
  const FastDeliveryNft = await hre.ethers.getContractFactory('FastDeliveryNft');
  const fastDeliveryNft = await FastDeliveryNft.deploy(TOKENCONTRACTADDRESS);

  await fastDeliveryNft.deployed();

  // Create/update deployed.json and print usefull information on the console.
  await deployed('FastDeliveryNft', hre.network.name, fastDeliveryNft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
