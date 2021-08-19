// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FastDeliveryNft is ERC721Enumerable {
    using Counters for Counters.Counter;

    enum Status {
        onLine,
        attributed,
        toCollect,
        inDelivery,
        delivered
    }

    struct Delivery {
        Status status;
        string firstNameRecipient;
        string lastNameRecipient;
        uint256 addressXRecipient;
        uint256 addressYRecipient;
        string addressInfoRecipient;
        string PhoneNumberRecipient;
        string mailRecipient;
        uint256 deliveryAmount;
        uint256 deliveringCode;
        uint256 deliveredTimeStamp;
    }

    uint256[] private userdliveries;
    Counters.Counter private _deliveryId;

    mapping(uint256 => Delivery) private _deliveries;
    mapping(address => uint256[]) private _userDeliveriesId;

    constructor() ERC721("Delivery", "DLV") {}

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal view virtual override(ERC721) returns (string memory) {
        return "";
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        return super._beforeTokenTransfer(from, to, tokenId);
    }

    // mint NFT function
    function createDelivery(string firstNameRecipient_) public returns (uint256) {
        uint256 newDeliveryId = _deliveryId.current();
        _mint(msg.sender, newDeliveryId);
        _userDeliveriesId.push(newDeliveryId);
        _deliveryId.increment();
        _Deliveries[newDeliveryId] = Delivery(firstNameRecipient_);
        return newDeliveryId;
    }

    function DeliveryInfo(uint256 deliveryId_) public view returns (Text memory) {
        return _deliveries[deliveryId_];
    }
}
