//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistry {
    struct Student {
        string name;
        uint age;
        bool isRegistered;
    }

    mapping(address => Student) public students;

    address public owner;

    event StudentRegisteredLog(
        address indexed studentAddress,
        string name,
        uint age
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Error: Only owner can add student!");
        _;
    }

    function registerStudent(
        address user,
        string memory name,
        uint age
    ) public onlyOwner {
        require(
            !students[user].isRegistered,
            "This student has registered already!"
        );

        students[user] = Student(name, age, true);

        emit StudentRegisteredLog(user, name, age);
    }

    function getStudent(address user) public view returns (Student memory) {
        return students[user];
    }

    function isStudentRegistered(address user) public view returns (bool) {
        return students[user].isRegistered;
    }
}
