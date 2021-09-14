const { expect } = require('chai');

describe('FastDeliveryNft', function () {
  let DaidToken, daidToken, FastDeliveryNft, fastDeliveryNft, dev, tokenOwnerTest, parcelSender, deliveryman, bob;

  beforeEach(async function () {
    // DAIDToken deployment
    [dev, tokenOwnerTest, parcelSender, deliveryman, bob] = await ethers.getSigners();
    const INITIAL_SUPPLY = ethers.utils.parseEther("1000000000000");
    const NAME = 'Delivery';
    const SYMBOL = 'DLV';

    DaidToken = await ethers.getContractFactory('DaidToken');
    daidToken = await DaidToken.connect(dev).deploy(tokenOwnerTest.address, INITIAL_SUPPLY);
    await daidToken.deployed();

    // FastdeliveryNft deployment
    FastDeliveryNft = await ethers.getContractFactory('FastDeliveryNft');
    fastDeliveryNft = await FastDeliveryNft.connect(dev).deploy(daidToken.address,);
    await fastDeliveryNft.deployed();
  });

  describe('FastDeliveryNft createDelivery function', function () {
  });

  describe('FastDeliveryNft delivered function', function () {

    beforeEach(async function () {
      const recipient = {
        FirstName_: "Bob",
        LastName_: "Doe",
        Address_: "Paris",
        AddressX_: "45",
        AddressY_: "46",
        AddressInfo_: "45",
        Tel_: "0102",
        Mail_: "@mail",
        deliveryAmount_: ethers.utils.parseEther("2"),
        deliveryDistance_: "3,5"
      };
      await daidToken.connect(parcelSender).approve(fastDeliveryNft.address, ethers.utils.parseEther("500000"))
      await daidToken.connect(tokenOwnerTest).transfer(parcelSender.address, ethers.utils.parseEther("50"));
      await fastDeliveryNft.connect(parcelSender).createDelivery(
        recipient.FirstName_,
        recipient.LastName_,
        recipient.Address_,
        recipient.AddressX_,
        recipient.AddressY_,
        recipient.AddressInfo_,
        recipient.Tel_,
        recipient.Mail_,
        recipient.deliveryAmount_,
        recipient.deliveryDistance_
      );
      const DELIVERY_CODE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1234"));
      const ID = 1;
      await fastDeliveryNft.connect(deliveryman).attributeDelivery(1)
      await fastDeliveryNft.connect(parcelSender).collectDelivery(1, DELIVERY_CODE)
    });
    it('deliveryman token balance increase delivery amount * 0,8', async function () {
      const DELIVERY_CODE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1234"));
      const ID = 1
      const PROFIT_RATE = 20
      const currentDeliverymanBalance = await daidToken.connect(deliveryman).balanceOf(deliveryman.address);
      await fastDeliveryNft.connect(deliveryman).delivered(ID, DELIVERY_CODE);
      expect(await daidToken.balanceOf(deliveryman.address)).to.equal(currentDeliverymanBalance + (ethers.utils.parseEther("2") * (100 - PROFIT_RATE)) / 100);
    });
  });
});
