/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
const hre = require('hardhat');

const TOKENCONTRACTADDRESS = '0x46b2FF8987A79269077402Dd945923C7F6cdb23d'
const FAUCETCONTRACTADDRESS = '0xe6300dfDbC1199A8cA704851ec5a294b2988898c'

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
