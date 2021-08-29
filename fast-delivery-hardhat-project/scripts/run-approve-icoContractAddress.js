/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */

const hre = require('hardhat');
const TOKENCONTRACTADDRESS = '0xb3e98C53b4Bc736588BAb19E03A08fE23157499c'
const ICOCONTRACTADDRESS = '0x61b86f4874dee5860e1299557b221846f22415D7'

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
    await daidToken.approve(ICOCONTRACTADDRESS, 10000000000);
    console.log((await daidToken.allowance(deployer.address, ICOCONTRACTADDRESS))
      .toString(), ` : ${ICOCONTRACTADDRESS}`);
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
