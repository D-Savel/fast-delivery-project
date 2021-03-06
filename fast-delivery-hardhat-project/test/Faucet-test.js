/* eslint-disable no-undef */
const { expect } = require('chai');

describe('Faucet', function () {
  let DaidToken, daidToken, Faucet, faucet, dev, tokenOwnerTest, faucetOwner, alice, bob;
  const INITIAL_SUPPLY = ethers.utils.parseEther("1000000000000");
  const FAUCET_AMOUNT = 10; // DAID Tokens

  beforeEach(async function () {
    // DaidToken deployment
    [tokenOwnerTest, faucetOwner, dev, alice, bob] = await ethers.getSigners();
    DaidToken = await ethers.getContractFactory('DaidToken');
    daidToken = await DaidToken.connect(dev).deploy(tokenOwnerTest.address, INITIAL_SUPPLY);
    await daidToken.deployed();

    // faucet deployment
    Faucet = await ethers.getContractFactory('Faucet');
    faucet = await Faucet.connect(faucetOwner).deploy(daidToken.address, FAUCET_AMOUNT);
    await faucet.deployed();
  });

  describe('Faucet deployement', function () {
    it('should faucet tokenOwner be daidToken tokenOwner ', async function () {
      expect(await daidToken.tokenOwner()).to.equal(tokenOwnerTest.address);
    });
    it('should faucet tokenContractAddress be daidToken contract address', async function () {
      expect(await faucet.tokenContractAddress()).to.equal(daidToken.address);
    });
    it('should faucet delay is 1 days', async function () {
      expect(await faucet.faucetDelay()).to.equal(86400);
    });
  });

  describe('Faucet function', function () {
    beforeEach(async function () {
      // approve smartcontract address for buying tokens
      await daidToken.connect(tokenOwnerTest).approve(faucet.address, INITIAL_SUPPLY);
    });
    describe('grabTokens', function () {
      it(`should balance user increase ${FAUCET_AMOUNT} DAID and delay faucet for user addrress increase of 1 day`,
        async function () {
          const block = await (ethers.provider.getBlock());
          const FAUCET_DELAY = (block.timestamp) + 86400; // 1 days = 86400 seconds
          const currentAliceBalance = await daidToken.balanceOf(alice.address);
          await (faucet.connect(alice)).grabTokens();
          expect(await daidToken.balanceOf(alice.address)).to.equal(currentAliceBalance.add(ethers.utils.parseEther(FAUCET_AMOUNT.toString())));
          expect(await faucet.faucetDelayOf(alice.address)).to.above(FAUCET_DELAY);
        });
      it('should tokens owner balance decrease grabbed faucet tokens amount', async function () {
        const currentTokenOwnerBalance = await daidToken.balanceOf(tokenOwnerTest.address);
        await faucet.connect(alice).grabTokens();
        expect(await daidToken.balanceOf(tokenOwnerTest.address))
          .to.equal(currentTokenOwnerBalance.sub(ethers.utils.parseEther(FAUCET_AMOUNT.toString())));
      });
      it('should revert for tokenOwner', async function () {
        await expect(faucet.connect(tokenOwnerTest).grabTokens())
          .to.be.revertedWith('Faucet: Tokens owner can not buy his tokens');
      });
      it('should set Delay to 0 and revert for trying grabing faucet if faucet delay = 0', async function () {
        await faucet.connect(tokenOwnerTest).setDelay(0);
        expect(await faucet.faucetDelay())
          .to.equal(0);
        await expect(faucet.connect(bob).grabTokens())
          .to.be.revertedWith('Faucet : Faucet offer is over');
      });
      it('should revert for trying grabing faucet Tokens again before 1 days faucet delay', async function () {
        await expect(faucet.connect(bob).grabTokens());
        await expect(faucet.connect(bob).grabTokens())
          .to.be.revertedWith('Faucet: You have already grabbed tokens since last day');
      });
      it('should autorize user grabing faucet Tokens again after 1 day delay is past', async function () {
        await faucet.connect(bob).grabTokens();
        await ethers.provider.send('evm_increaseTime', [86401]); // 1 days + 1 sec. (time elapsed for block minting)= 86401 seconds
        await ethers.provider.send('evm_mine');
        const currentBobBalance = await daidToken.balanceOf(alice.address);
        expect(await daidToken.balanceOf(bob.address)).to.equal(currentBobBalance.add(ethers.utils.parseEther(FAUCET_AMOUNT.toString())));
      });
      it('should emit tranfer event', async function () {
        expect(await faucet.connect(bob).grabTokens())
          .to.emit(daidToken, 'Transfer').withArgs(tokenOwnerTest.address, bob.address, ethers.utils.parseEther(FAUCET_AMOUNT.toString()));
      });
    });
    describe('faucetDelayOf', function () {
      it('should return timeStamp increase of 1 days after grabing tokens',
        async function () {
          const block = await (ethers.provider.getBlock());
          const FAUCET_DELAY = (block.timestamp) + 86400;
          await (faucet.connect(alice)).grabTokens();
          expect(await faucet.faucetDelayOf(alice.address)).to.above(FAUCET_DELAY);
        });
    });
    describe('TokenOwner', function () {
      it('should return DAID tokens owner',
        async function () {
          expect(await faucet.tokenOwner()).to.equal(await daidToken.tokenOwner());
        });
    });
  });
});
