//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 private count;

    constructor() {
        count = 0;
    }

    function getCount() public view returns (uint256) {
        return count;
    }

    function increment() public {
        count++;
    }
}