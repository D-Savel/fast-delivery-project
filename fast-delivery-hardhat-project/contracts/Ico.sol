// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./DaidToken.sol";
import "@openzeppelin/contracts/utils/Address.sol";

/**
 * @title Ico contract
 * @author D.Savel
 * @notice Contract use for ico of ERC20 (DaidToken.sol)
 * @dev This contract connect to DaidToken.sol ERC20 contract.
 */

contract Ico {
    /// @dev openzeppelin Address library usage for payable function
    using Address for address payable;

    /// @dev ERC20 contract choose for Daid tokens ICO
    DaidToken private _daidToken;

    /// @dev DAID token contract address
    address private _tokenContractAddress;

    // The price of 1 unit of our token in wei;
    uint256 private _price = 4 * 1e14; // 1 DAID = 4* 1E14 wei

    address private _tokenOwner;

    /**
     * @dev Event Bought for buying tokens
     * @param recipient : Address of tokens buyer
     * @param TokenAmount : Amount of tokens buy
     * @param etherAmount : Amount of Ethers spend for buying tokens
     */
    event Bought(address indexed recipient, uint256 TokenAmount, uint256 etherAmount);

    /**
     * @dev Event Withdrew for profit
     * @param recipient : Address for Withdraw recipient (tokens owner)
     * @param etherAmount : Amount of withdrawing profit in Ethers
     */
    event Withdrew(address indexed recipient, uint256 etherAmount);

    /**
     * @dev Event change rate value
     * @param newPrice : new value for rate
     */
    event PriceChanged(uint256 newPrice);

    /**
     * @dev Construtor intancies the tokens owner (seller) and link to ERC20 (DaidToken)
     * @param tokenContractAddress_ the address of tokens owner in ERC20 contract
     */

    constructor(address tokenContractAddress_) {
        _tokenContractAddress = tokenContractAddress_; //Token smartcontract address
        _daidToken = DaidToken(tokenContractAddress_); // Token smartcontract link
        _tokenOwner = _daidToken.tokenOwner();
    }

    /// @dev ICO smart contract use buyTokens() function for external payable function
    receive() external payable {
        buyTokens(msg.value / _price);
    }

    /** @notice Public payable function to buy tokens, this function is callable only :
     * for address different of tokens owner /
     * if ether amount for buying tokens is above 0 ether /
     * if number of tokens remaining is above the buyer demande /
     * @dev buyTokens call transferFrom function from ERC20 DaidToken contract
     * it tranfers bought tokens from tokens owner to buyer
     */
    function buyTokens(uint256 nbTokens_) public payable returns (bool) {
        require(msg.value >= 0, "ICO: Price is not 0 ether");
        require(msg.sender != _tokenOwner, "ICO: owner can not buy his tokens");
        require(nbTokens_ * _price < msg.value, "ICO: not enough Ether to purchase");
        uint256 _realPrice = nbTokens_ * _price;
        uint256 _remaining = msg.value - _realPrice;
        _daidToken.transferFrom(_tokenOwner, msg.sender, nbTokens_);
        if (_remaining > 0) {
            payable(msg.sender).sendValue(_remaining);
        }
        emit Bought(msg.sender, nbTokens_, _realPrice);
        return true;
    }

    /** @notice Public function to withdraw profit for tokens owner, this function is callable only :
     * for tokens owner /
     * if ether balance of ico smart contract is above 0 /
     * @dev withdrawProfit call sendValue function from Address.sol import from Open zeppelin for address payable
     */
    function withdrawProfit() public {
        require(msg.sender == _tokenOwner, "ICO: Only tokens owner can withdraw profit");
        require(address(this).balance != 0, "ICO: No profit to withdraw");
        uint256 icoEtherAmount = address(this).balance;
        payable(msg.sender).sendValue(icoEtherAmount);
        emit Withdrew(msg.sender, icoEtherAmount);
    }

    function changePrice(uint256 newPrice_) public {
        require(msg.sender == _tokenOwner, "ICO: Only tokens owner can change rate");
        _price = newPrice_;
        emit PriceChanged(newPrice_);
    }

    /**
     * @notice Returns the amount of tokens allowance for spender
     * @param spender the address for which is return the allowance amount
     * @dev function allowance called from ERC20 DaidToken contract
     */
    function allowances(address spender) public view returns (uint256) {
        address tokenOwner_ = tokenOwner();
        return _daidToken.allowance(tokenOwner_, spender);
    }

    /**
     * @notice Returns the amount of tokens for an address
     * @param account_ the address to return tokens balance
     * @dev function balanceOf called from ERC20 DaidToken contract
     */
    function tokensBalanceOf(address account_) public view returns (uint256) {
        return _daidToken.balanceOf(account_);
    }

    /// @return ERC20 Token contract Address.
    function tokenContractAddress() public view returns (address) {
        return _tokenContractAddress;
    }

    /// @return Tokens owner Address.
    function tokenOwner() public view returns (address) {
        return _tokenOwner;
    }

    /// @return Price for 1 DAID Token to wei.
    function price() public view returns (uint256) {
        return _price;
    }
}
