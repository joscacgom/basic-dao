// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovToken is ERC20Votes {
    uint256 public s_maxSupply = 1000000000000000000000000000;

    constructor() ERC20("GovToken", "GOV") ERC20Permit("GovToken") {
        _mint(msg.sender, s_maxSupply);
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address from, uint256 amount)
        internal
        override(ERC20Votes)
    {
        super._burn(from, amount);
    }
}
