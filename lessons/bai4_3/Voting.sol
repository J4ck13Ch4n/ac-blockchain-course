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
    mapping(address => bool) public hasWithdrawn; // Theo dõi ai đã rút lại cọc

    address public owner;
    uint public stakeAmount = 0.001 ether; // Số tiền yêu cầu đặt cọc
    uint public burnPercentage = 20; // % bị đốt khi rút cọc (20%)

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

    // --- CƠ CHẾ ĐẶT CỌC VÀ ĐỐT MỘT PHẦN (STAKE & PARTIAL BURN) ---

    // Hàm đặt cọc để vote
    function stakeToVote(uint _candidateId) public payable {
        // Yêu cầu người dùng cọc đủ tiền (ví dụ 0.1 ETH)
        require(msg.value == stakeAmount, "Error: You must stake exactly the required amount!");
        require(!hasVoted[msg.sender], "Error: You have already voted!");
        require(
            _candidateId > 0 && _candidateId <= candidatesCount,
            "Error: Candidate ID not available!"
        );

        // Ghi nhận đã vote
        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit Voted(msg.sender, _candidateId);
    }

    // Hàm cho phép người dùng rút lại tiền cọc (sẽ bị trừ đi một khoản phí để đốt vĩnh viễn)
    function withdrawStake() public {
        require(hasVoted[msg.sender], "Error: You have not voted!");
        require(!hasWithdrawn[msg.sender], "Error: You have already withdrawn your stake!");

        // Đánh dấu đã rút cọc để chống tấn công rút nhiều lần (Re-entrancy)
        hasWithdrawn[msg.sender] = true;

        // Tính toán số tiền được nhận lại và số tiền bị đốt
        uint burnAmount = (stakeAmount * burnPercentage) / 100;
        uint refundAmount = stakeAmount - burnAmount;

        // 1. Chuyển tiền hoàn trả cho người vote
        payable(msg.sender).transfer(refundAmount);

        // 2. Chuyển tiền bị đốt vào địa chỉ vĩnh viễn không ai sở hữu (Dead address)
        address deadAddress = 0x000000000000000000000000000000000000dEaD;
        payable(deadAddress).transfer(burnAmount);
    }

    // Admin có thể thay đổi số cọc tối thiểu và phần trăm đốt
    function setStakeRules(uint _newStakeAmount, uint _newBurnPercentage) public onlyOwner {
        require(_newBurnPercentage <= 100, "Error: Burn percentage cannot exceed 100");
        stakeAmount = _newStakeAmount;
        burnPercentage = _newBurnPercentage;
    }
}
