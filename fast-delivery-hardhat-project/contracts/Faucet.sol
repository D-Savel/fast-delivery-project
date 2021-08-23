// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./DaidToken.sol";

/**
 * @title Faucet contract
 * @author D.Savel
 * @notice This Contract is used with ERC20 contract (Daidtoken.sol), with 1 day delay between each faucet offer for the same address.
 * @dev This contract connect to Daidoken.sol ERC20 contract.
 */

contract Faucet {
    /// @dev ERC20 contract choose for grabing tokens
    DaidToken private _daidToken;

    /**
     * @dev mapping user address toward timestamp for next faucet offer.
     */

    mapping(address => uint256) private _faucetDelay;

    address private _tokenContractAddress;
    address private _tokenOwner;
    uint256 private _faucetAmount;
    uint256 private _delay = 1 days; // Delay for faucet offer intervall.

    /**
     * @dev Construtor intancies the tokens owner (seller) and link to ERC20 (DaidToken).
     * @param tokenContractAddress_ : Address of tokens owner in ERC20 contract.
     * @param faucetAmount_ : faucet amount.
     */

    constructor(address tokenContractAddress_, uint256 faucetAmount_) {
        _tokenContractAddress = tokenContractAddress_; //Token smartcontract address
        _daidToken = DaidToken(tokenContractAddress_); // Token smartcontract link
        _tokenOwner = _daidToken.tokenOwner();
        _faucetAmount = faucetAmount_;
    }

    /**
     * @notice Public function to offer the faucet amount tokens, this function is callable only :
     * if user address has not grab faucet tokens since last 1 day.
     * if user address is not the Tokens Owner.
     * if delay not equal to 0.
     * @dev grabTokens call transferFrom function from ERC20 DaidToken contract.
     * it tranfers tokens from tokens owner to user address.
     */

    function grabTokens() public returns (bool) {
        require(msg.sender != _tokenOwner, "Faucet: Tokens owner can not buy his tokens");
        require(_delay != 0, "Faucet : Faucet offer is over");
        if (_faucetDelay[msg.sender] == 0) {
            _faucetDelay[msg.sender] = block.timestamp;
        }
        require(_faucetDelay[msg.sender] <= block.timestamp, "Faucet: You have already grabbed tokens since last day");
        _daidToken.transferFrom(_tokenOwner, msg.sender, _faucetAmount);
        _faucetDelay[msg.sender] = block.timestamp + _delay;
        return true;
    }

    /**
     * @notice Public function to set delay only for tokens owner.
     * @dev if delay_ = 0, the faucet is stopped by require.
     */

    function setDelay(uint256 delay_) public returns (bool) {
        require(msg.sender == _tokenOwner, "Faucet: Only tokens owner can set delay");
        _delay = delay_;
        return true;
    }

    /// @return Faucet amount.
    function faucetAmount() public view returns (uint256) {
        return _faucetAmount;
    }

    /// @return Delay between each faucet offer.
    function faucetDelay() public view returns (uint256) {
        return _delay;
    }

    /**
     * @return Timestamp in seconds for next faucet offer for user address.
     * @param account address for which is return the delay for next faucet offer.
     * @dev The faucet delay value is a timestamp in seconds.
     **/
    function faucetDelayOf(address account) public view returns (uint256) {
        return _faucetDelay[account];
    }

    /**
     * @return Tokens owner Address.
     * @dev The Tokens owner is assigned in DaidToken ERC20 contract.
     */
    function tokenOwner() public view returns (address) {
        return _tokenOwner;
    }

    /// @return DaidToken ERC20 contract address.
    function tokenContractAddress() public view returns (address) {
        return _tokenContractAddress;
    }
}
