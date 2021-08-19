// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title DaidToken contract
/// @author D.Savel
/// @notice This ERC20 contract use ERC20 openzepplin contract to mint DAID Tokens and define an owner for tokens initial supply.

contract DaidToken is ERC20 {
    address private _tokenOwner;

    /**
     * @dev Construtor intancies the tokens owner and mints the initial tokens supply.
     * @dev 'DaiDeliveryToken' : Token name for ERC20 contract constructor.
     * @dev 'DAID' : Token symbol for ERC20 contract constructor.
     * @param owner_ : Address of tokens owner.
     * @param initialSupply : Initial tokens supply.
     */

    constructor(address owner_, uint256 initialSupply) ERC20("DaiDeliveryToken", "DAID") {
        _mint(owner_, initialSupply);
        _tokenOwner = owner_;
        emit Transfer(address(0), owner_, initialSupply);
    }

    /// @notice Returns Tokens owner Address.
    function tokenOwner() public view returns (address) {
        return _tokenOwner;
    }
}
