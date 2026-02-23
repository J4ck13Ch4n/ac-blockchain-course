//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    uint public candidatesCount;

    mapping(uint => Candidate) public candidates;

    mapping(address => bool) public hasVoted;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Error: Only owner can modify!");
        _;
    }

    event Voted(address indexed voter, uint candidateId);

    function addCandidate(string memory _name) public onlyOwner {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(_name, 0);
    }

    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "Error: You have voted yet!");

        require(
            _candidateId > 0 && _candidateId <= candidatesCount,
            "Error: Candidate ID not available!"
        );

        hasVoted[msg.sender] = true;

        candidates[_candidateId].voteCount++;

        emit Voted(msg.sender, _candidateId);
    }
}
