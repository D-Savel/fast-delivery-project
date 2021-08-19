/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { expect } = require('chai');

describe('DaidToken', function () {
  let DaidToken, daidToken, dev, owner, alice, bob, charlie, dan, eve;
  const NAME = 'DaiDeliveryToken';
  const SYMBOL = 'DAID';
  const INITIAL_SUPPLY = ethers.utils.parseEther('10000000000');

  beforeEach(async function () {
    [dev, owner, alice, bob, charlie, dan, eve] = await ethers.getSigners();
    DaidToken = await ethers.getContractFactory('DaidToken');
    daidToken = await DaidToken.connect(dev).deploy(owner.address, INITIAL_SUPPLY);
    await daidToken.deployed();
  });

  describe('Deployement', function () {
    it('Has name DaiDeliveryToken', async function () {
      expect(await daidToken.name()).to.equal(NAME);
    });
    it('Has symbol DAID', async function () {
      expect(await daidToken.symbol()).to.equal(SYMBOL);
    });
    it('mints initial Supply to owner', async function () {
      expect(await daidToken.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
    });

    it('emits event Transfer when mint initial supply to owner at deployement', async function () {
      let receipt = await daidToken.deployTransaction.wait();
      let txHash = receipt.transactionHash;
      await expect(txHash)
        .to.emit(daidToken, 'Transfer')
        .withArgs(ethers.constants.AddressZero, owner.address, INITIAL_SUPPLY);
    });
  });
});
