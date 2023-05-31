// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Box is Ownable {
    uint256 internal value;

    event ValueChange(uint256 newValue);

    function store(uint256 newValue) public {
        value = newValue;

        emit ValueChange(newValue);
    }

    function retrieve() public view returns (uint256) {
        return value;
    }
}
