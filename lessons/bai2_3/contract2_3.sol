//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Welcome {
    string public greeting;

    constructor(string memory initialMessage) {
        greeting = initialMessage;
    }

    function getGreeting() public view returns (string memory, address) {
        return (greeting, msg.sender);
    }
}