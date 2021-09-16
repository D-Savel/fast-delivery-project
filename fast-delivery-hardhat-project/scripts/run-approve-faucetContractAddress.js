/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
const hre = require('hardhat');

const TOKENCONTRACTADDRESS = '0xCe9C1509E195275B873A509dd56a356bfF13f0b7'
const FAUCETCONTRACTADDRESS = '0xf6977087EE2560d2Df84DEB7F0Cc79c579aaE7C1'

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // Optionnel car l'account deployer est utilisé par défaut
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  // We get the contract to deploy
  const DaidToken = await hre.ethers.getContractFactory('DaidToken');
  const daidToken = await DaidToken.attach(TOKENCONTRACTADDRESS);

  if (hre.network.name !== 'mainnet') {
    await daidToken.approve(FAUCETCONTRACTADDRESS, ethers.utils.parseEther('33000000'));
    const faucetAllowance = await daidToken.allowance(deployer.address, FAUCETCONTRACTADDRESS);
    console.log(faucetAllowance.toString(), ' : Allowance to FAUCETCONTRACTADDRESS');
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
