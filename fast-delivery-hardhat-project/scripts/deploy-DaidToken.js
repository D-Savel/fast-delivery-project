/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
const hre = require('hardhat');
const { deployed } = require('./deployed');

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
  const DaidToken = await hre.ethers.getContractFactory('DaidToken');
  const daidToken = await DaidToken.deploy(deployer.address, ethers.utils.parseEther('10000000000'));

  await daidToken.deployed();

  // Create/update deployed.json and print usefull information on the console.
  await deployed('DaidToken', hre.network.name, daidToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
