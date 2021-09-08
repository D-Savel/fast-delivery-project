// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract FastDeliveryUser {
    UserProfil private _userProfil;

    enum UserProfil {
        none,
        parcelSender,
        deliveryman
    }

    struct User {
        UserProfil profil;
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

    function userRegister(
        string memory profil_,
        string memory firstName_,
        string memory lastName_,
        string memory addressParcelSender_,
        string memory addressXParcelSender_,
        string memory addressYParcelSender_,
        string memory companySiren_,
        string memory addressInfo_,
        string memory tel_,
        string memory mail_
    ) public returns (bool) {
        if (keccak256(abi.encodePacked(profil_)) == keccak256(abi.encodePacked("deliveryman"))) {
            _userProfil = UserProfil.deliveryman;
        } else {
            _userProfil = UserProfil.parcelSender;
        }
        _users[msg.sender] = User({
            profil: _userProfil,
            firstName: firstName_,
            lastName: lastName_,
            userAddress: addressParcelSender_,
            addressX: addressXParcelSender_,
            addressY: addressYParcelSender_,
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

    function getUserType(address userAddress_) public view returns (UserProfil) {
        return _users[userAddress_].profil;
    }
}
