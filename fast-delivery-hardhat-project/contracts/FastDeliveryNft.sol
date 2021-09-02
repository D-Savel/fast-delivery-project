// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./DaidToken.sol";

contract FastDeliveryNft is ERC721 {
    // library usage;
    using Counters for Counters.Counter;

    /// @dev ERC20 contract choose for Daid tokens ICO
    DaidToken private _daidToken;
    Status public status;

    enum Status {
        onLine,
        attributed,
        inDelivery,
        delivered,
        deleted
    }

    struct Delivery {
        Status status;
        address parcelSender;
        address deliveryman;
        string firstNameRecipient;
        string lastNameRecipient;
        string addressXRecipient;
        string addressYRecipient;
        string addressInfoRecipient;
        string telRecipient;
        string mailRecipient;
        string deliveryDay;
        uint256 deliveryAmount;
        string deliveryCode;
        uint256 onlineTimestamp;
        uint256 attributionTimestamp;
        uint256 collectTimestamp;
        uint256 deliveredTimestamp;
    }

    address private _tokenContractAddress;
    uint256[] private userDeliveriesArray;
    Counters.Counter private _deliveryId;

    mapping(uint256 => Delivery) private _deliveries;
    mapping(address => uint256[]) private _userDeliveriesId;
    mapping(address => uint256) private _userDeliveriesAmountBalance;

    constructor(address tokenContractAddress_) ERC721("Delivery", "DLV") {
        _tokenContractAddress = tokenContractAddress_; //Token smartcontract address
        _daidToken = DaidToken(tokenContractAddress_); // Token smartcontract link
        // Id for delivery start at 1 instead 0
        _deliveryId.increment();
    }

    // mint delivery NFT
    function createDelivery(
        string memory firstNameRecipient_,
        string memory lastNameRecipient_,
        string memory addressXRecipient_,
        string memory addressYRecipient_,
        string memory addressInfoRecipient_,
        string memory telRecipient_,
        string memory mailRecipient_,
        string memory deliveryDay_,
        uint256 deliveryAmount_
    ) public returns (uint256) {
        require(
            deliveryAmount_ < _daidToken.balanceOf(msg.sender),
            "FastDeliveryNft: not enough DAID tokens for adding this delivery"
        );
        // Create delivery Nft
        uint256 newDeliveryId = _deliveryId.current();
        _mint(msg.sender, newDeliveryId);
        _deliveryId.increment();
        userDeliveriesArray.push(newDeliveryId);
        _deliveries[newDeliveryId] = Delivery({
            status: Status.onLine,
            parcelSender: msg.sender,
            deliveryman: 0x0000000000000000000000000000000000000000,
            firstNameRecipient: firstNameRecipient_,
            lastNameRecipient: lastNameRecipient_,
            addressXRecipient: addressXRecipient_,
            addressYRecipient: addressYRecipient_,
            addressInfoRecipient: addressInfoRecipient_,
            telRecipient: telRecipient_,
            mailRecipient: mailRecipient_,
            deliveryDay: deliveryDay_,
            deliveryAmount: deliveryAmount_,
            deliveryCode: "0",
            onlineTimestamp: block.timestamp,
            attributionTimestamp: 0,
            collectTimestamp: 0,
            deliveredTimestamp: 0
        });
        _userDeliveriesId[msg.sender].push(newDeliveryId);
        // Transfer delivery price to deliveries deposit fund
        _daidToken.transferFrom(msg.sender, address(this), deliveryAmount_);
        _userDeliveriesAmountBalance[msg.sender] += deliveryAmount_;
        return newDeliveryId;
    }

    // delete delivery by parcel sender before parcel has been chosen by a deliveryman
    function deleteDelivery(uint256 deliveryId_) public returns (bool) {
        require(deliveryId_ < _deliveryId.current(), "FastDeliveryNft: The Id of this delivery does not exist");
        require(
            _deliveries[deliveryId_].status == Status.onLine,
            "FastDeliveryNft: To be deleted the delivery status must be on line"
        );
        require(
            ownerOf(deliveryId_) == msg.sender,
            "FastDeliveryNft: You must be the parcel sender to delete this delivery"
        );
        uint256 index;
        if (deliveryId_ == _userDeliveriesId[msg.sender].length - 1) {
            index = deliveryId_;
        } else {
            for (uint256 i = 0; i < _userDeliveriesId[msg.sender].length; i++) {
                if (deliveryId_ == _userDeliveriesId[msg.sender][i]) index = i;
                index = i;
            }
        }
        _daidToken.transferFrom(address(this), msg.sender, _deliveries[deliveryId_].deliveryAmount);
        _userDeliveriesAmountBalance[msg.sender] -= _deliveries[deliveryId_].deliveryAmount;
        delete _userDeliveriesId[msg.sender][index];
        _deliveries[deliveryId_].status = Status.deleted;
        _burn(deliveryId_);
        return true;
    }

    // Attribute a delivery to a deliveryman
    function attributeDelivery(uint256 deliveryId_) public returns (bool) {
        require(deliveryId_ < _deliveryId.current(), "FastDeliveryNft: The Id of this delivery does not exist");
        _userDeliveriesId[msg.sender].push(deliveryId_);
        _deliveries[deliveryId_].status = Status.attributed;
        _deliveries[deliveryId_].deliveryman = msg.sender;
        _deliveries[deliveryId_].attributionTimestamp = block.timestamp;
        return true;
    }

    // Cancel delivery function by deliveryman before parcel has been collected
    function cancelDelivery(uint256 deliveryId_) public returns (bool) {
        require(deliveryId_ < _deliveryId.current(), "FastDeliveryNft: The Id of this delivery does not exist");
        require(
            _deliveries[deliveryId_].status == Status.attributed,
            "FastDeliveryNft: to be deleted the delivery status must be attributed"
        );
        require(
            ownerOf(deliveryId_) == msg.sender,
            "FastDeliveryNft: You must be the deliveryman oh this parcel to delete this delivery"
        );
        uint256 index;
        if (deliveryId_ == _userDeliveriesId[msg.sender].length - 1) {
            index = deliveryId_;
        } else {
            for (uint256 i = 0; i < _userDeliveriesId[msg.sender].length; i++) {
                if (deliveryId_ == _userDeliveriesId[msg.sender][i]) index = i;
            }
        }
        delete _userDeliveriesId[msg.sender][index];
        _deliveries[deliveryId_].status = Status.onLine;
        _deliveries[deliveryId_].attributionTimestamp = 0;
        transferFrom(msg.sender, _deliveries[deliveryId_].parcelSender, deliveryId_);
        return true;
    }

    // Collect delivery by a deliveryman
    function collectDelivery(uint256 deliveryId_, string memory deliverycode_) public returns (bool) {
        require(
            _deliveries[deliveryId_].parcelSender == msg.sender,
            "FastDeliveryNft: Only parcel sender can access this function"
        );
        require(deliveryId_ < _deliveryId.current(), "FastDeliveryNft: The Id of this delivery does not exist");
        require(
            _deliveries[deliveryId_].status == Status.attributed,
            "FastDeliveryNft: to be collected, the delivery status must be attributed"
        );
        transferFrom(_deliveries[deliveryId_].parcelSender, _deliveries[deliveryId_].deliveryman, deliveryId_);
        _deliveries[deliveryId_].status = Status.inDelivery;
        _deliveries[deliveryId_].deliveryCode = deliverycode_;
        _deliveries[deliveryId_].collectTimestamp = block.timestamp;
        return true;
    }

    function delivered(uint256 deliveryId_, string memory code_) public returns (bool) {
        require(
            keccak256(abi.encodePacked(code_)) == keccak256(abi.encodePacked(_deliveries[deliveryId_].deliveryCode)),
            "FastDeliveryNft: The delivery code for this delivery Id is false"
        );
        require(
            _deliveries[deliveryId_].deliveryman == msg.sender,
            "FastDeliveryNft: Only deliveryman can access this function"
        );
        require(deliveryId_ < _deliveryId.current(), "FastDeliveryNft: The Id of this delivery does not exist");
        require(
            _deliveries[deliveryId_].status == Status.inDelivery,
            "FastDeliveryNft: to be delivered, the delivery status must be in delivery"
        );
        _daidToken.transferFrom(address(this), msg.sender, _deliveries[deliveryId_].deliveryAmount);
        _userDeliveriesAmountBalance[msg.sender] -= _deliveries[deliveryId_].deliveryAmount;
        _burn(deliveryId_);
        _deliveries[deliveryId_].status = Status.delivered;
        _deliveries[deliveryId_].deliveredTimestamp = block.timestamp;
        _daidToken.transferFrom(address(this), msg.sender, _deliveries[deliveryId_].deliveryAmount);
        return true;
    }

    function DeliveryInfo(uint256 deliveryId_) public view returns (Delivery memory) {
        return _deliveries[deliveryId_];
    }

    function getDeliveriesIdByAddress(address userAddress) public view returns (uint256[] memory) {
        return _userDeliveriesId[userAddress];
    }
}
