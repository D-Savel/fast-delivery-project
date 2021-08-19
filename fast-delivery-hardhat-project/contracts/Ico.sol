// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "./DaidToken.sol";

/**
 * @title Ico contract
 * @author D.Savel
 * @notice Contract use for ico of ERC20 (DaidToken.sol)
 * @dev This contract connect to DaidToken.sol ERC20 contract.
 */

contract Ico {
    /// @dev openzeppelin Address library usage for payable function
    using Address for address payable;

    /// @dev ERC20 contract choose for ICO ERC20 contract choose for ICO
    DaidToken private _daidToken;

    address private _tokenContractAddress;
    address private _tokenOwner;
    uint256 private _rate = 3000; // 1 ETHER = 3000 DAID Tokens

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
        buyTokens();
    }

    /** @notice Public payable function to buy tokens, this function is callable only :
     * for address different of tokens owner /
     * if ether amount for buying tokens is above 0 ether /
     * if number of tokens remaining is above the buyer demande /
     * if ico delay is not over.
     * @dev buyTokens call transferFrom function from ERC20 DaidToken contract
     * it tranfers bought tokens from tokens owner to buyer
     */
    function buyTokens() public payable returns (bool) {
        require(msg.sender != _tokenOwner, "ICO: owner can not buy his tokens");
        require(msg.value * _rate < tokensRemainingIco(), "ICO: not enough tokens remaining to sell");
        uint256 tokenAmount = msg.value * _rate;
        _daidToken.transferFrom(_tokenOwner, msg.sender, tokenAmount);
        emit Bought(msg.sender, tokenAmount, msg.value);
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

    /**
     * @return Amount of tokens remaining for ico.
     * @dev function balanceOf called from ERC20 DaidToken contract
     */
    function tokensRemainingIco() public view returns (uint256) {
        return _daidToken.balanceOf(_tokenOwner);
    }

    /// @return Current balance of Ethers of the ico offer profit.
    function profit() public view returns (uint256) {
        return address(this).balance;
    }

    /// @return ERC20 Token contract Address.
    function tokenContractAddress() public view returns (address) {
        return _tokenContractAddress;
    }

    /// @return Tokens owner Address.
    function tokenOwner() public view returns (address) {
        return _tokenOwner;
    }
}
