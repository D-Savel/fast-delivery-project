// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FastDeliveryNft is ERC721Enumerable {
    using Counters for Counters.Counter;

    // TODO Add modifier only nft owner

    enum Status {
        onLine,
        attributed,
        toCollect,
        inDelivery,
        delivered
    }

    Status public status;

    struct Delivery {
        Status status;
        address parcelSender;
        address deliveryman;
        string firstNameRecipient;
        string lastNameRecipient;
        uint256 addressXRecipient;
        uint256 addressYRecipient;
        string addressInfoRecipient;
        string telRecipient;
        string mailRecipient;
        uint256 deliveryAmount;
        uint256 deliveryCode;
        uint256 onlineTimestamp;
        uint256 collectTimeStamp;
        uint256 deliveredTimeStamp;
    }

    uint256[] private userDeliveriesArray;
    Counters.Counter private _deliveryId;

    mapping(uint256 => Delivery) private _deliveries;
    mapping(address => uint256[]) private _userDeliveriesId;

    constructor() ERC721("Delivery", "DLV") {}

    // mint delivery NFT function
    function createDelivery(
        string memory firstNameRecipient_,
        string memory lastNameRecipient_,
        uint256 addressXRecipient_,
        uint256 addressYRecipient_,
        string memory addressInfoRecipient_,
        string memory telRecipient_,
        string memory mailRecipient_,
        uint256 deliveryAmount_
    ) public returns (uint256) {
        uint256 newDeliveryId = _deliveryId.current();
        _mint(msg.sender, newDeliveryId);
        userDeliveriesArray.push(newDeliveryId);
        _deliveryId.increment();
        status = Status.onLine;
        _deliveries[newDeliveryId] = Delivery({
            status: status,
            parcelSender: msg.sender,
            deliveryman: 0x0000000000000000000000000000000000000000,
            firstNameRecipient: firstNameRecipient_,
            lastNameRecipient: lastNameRecipient_,
            addressXRecipient: addressXRecipient_,
            addressYRecipient: addressYRecipient_,
            addressInfoRecipient: addressInfoRecipient_,
            telRecipient: telRecipient_,
            mailRecipient: mailRecipient_,
            deliveryAmount: deliveryAmount_,
            deliveryCode: 0,
            onlineTimestamp: block.timestamp,
            collectTimeStamp: 0,
            deliveredTimeStamp: 0
        });
        _userDeliveriesId[msg.sender].push(newDeliveryId);
        return newDeliveryId;
    }

    // delete delivery function
    function deleteDelivery(uint256 deliveryId_) public returns (bool) {
        for (uint256 i = 0; i < _userDeliveriesId[msg.sender].length; i++) {
            if (deliveryId_ == _userDeliveriesId[msg.sender][i]) {
                uint256 indexValue = i;
                _userDeliveriesId[msg.sender][indexValue] = _userDeliveriesId[msg.sender][
                    userDeliveriesArray.length - 1
                ];
                _userDeliveriesId[msg.sender].pop;
            }

            _burn(deliveryId_);
        }
        return true;
    }

    function DeliveryInfo(uint256 deliveryId_) public view returns (Delivery memory) {
        return _deliveries[deliveryId_];
    }
}
