//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingEligibility{
    uint public minAge = 18;

    address public owner = msg.sender;

    function checkEligibility(uint age) public view returns (bool) {
        return age >= minAge;
    }

    function updateMinAge(uint newMinAge) public {
        require(owner == msg.sender, "Only owner can update minAge");
        minAge = newMinAge;
    }
}