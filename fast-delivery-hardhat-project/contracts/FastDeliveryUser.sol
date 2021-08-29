// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract FastDeliveryUser {
    struct User {
        address parcelSender;
        address deliveryman;
        string firstName;
        string lastName;
        string userAddress;
        string addressX;
        string addressY;
        string companySiren;
        string addressInfo;
        string tel;
        string mail;
        uint256 registerTimestamp;
    }

    mapping(address => User) private _users;

    constructor() {}

    function parcelSenderRegister(
        string memory firstName_,
        string memory lastName_,
        string memory addressParcelSender_,
        string memory addressXParcelSender_,
        string memory addressYParcelSender_,
        string memory addressInfo_,
        string memory tel_,
        string memory mail_
    ) public returns (bool) {
        _users[msg.sender] = User({
            parcelSender: msg.sender,
            deliveryman: 0x0000000000000000000000000000000000000000,
            firstName: firstName_,
            lastName: lastName_,
            userAddress: addressParcelSender_,
            addressX: addressXParcelSender_,
            addressY: addressYParcelSender_,
            companySiren: "0",
            addressInfo: addressInfo_,
            tel: tel_,
            mail: mail_,
            registerTimestamp: block.timestamp
        });
        return true;
    }

    function deliverymanRegister(
        string memory firstName_,
        string memory lastName_,
        string memory addressDeliveryman_,
        string memory addressXDeliveryman_,
        string memory addressYDeliveryman_,
        string memory companySiren_,
        string memory addressInfo_,
        string memory tel_,
        string memory mail_
    ) public returns (bool) {
        _users[msg.sender] = User({
            parcelSender: 0x0000000000000000000000000000000000000000,
            deliveryman: msg.sender,
            firstName: firstName_,
            lastName: lastName_,
            userAddress: addressDeliveryman_,
            addressX: addressXDeliveryman_,
            addressY: addressYDeliveryman_,
            companySiren: companySiren_,
            addressInfo: addressInfo_,
            tel: tel_,
            mail: mail_,
            registerTimestamp: block.timestamp
        });
        return true;
    }

    function getUserInfo(address userAddress_) public view returns (User memory) {
        return _users[userAddress_];
    }

    function getUserType(address userAddress_) public view returns (string memory) {
        if (_users[userAddress_].parcelSender == 0x0000000000000000000000000000000000000000) {
            return "Deliveryman";
        } else {
            return "Parcel Sender";
        }
    }
}
