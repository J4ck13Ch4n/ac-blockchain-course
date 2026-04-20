import { expect } from "chai";
import { ethers } from "hardhat";

describe("Voting Contract - Stake and Partial Burn Mechanisms", function () {
    let voting: any;
    let owner: any;
    let voter1: any;
    let voter2: any;
    const DEAD_ADDRESS = "0x000000000000000000000000000000000000dEaD";

    beforeEach(async function () {
        [owner, voter1, voter2] = await ethers.getSigners();
        const Voting = await ethers.getContractFactory("Voting");
        voting = await Voting.deploy();
        
        // Add some candidates
        await voting.addCandidate("Alice"); // id 1
        await voting.addCandidate("Bob");   // id 2
    });

    it("should allow a user to stake and vote", async function () {
        const stakeAmount = await voting.stakeAmount();
        
        // Voter 1 stakes exactly 0.1 ETH and votes for Candidate 1
        await voting.connect(voter1).stakeToVote(1, { value: stakeAmount });

        // Check if vote was recorded
        const hasVoted = await voting.hasVoted(voter1.address);
        expect(hasVoted).to.be.true;

        // Check candidate vote count
        const candidate = await voting.candidates(1);
        expect(candidate.voteCount).to.equal(1n);
    });

    it("should fail if user stakes incorrect amount", async function () {
        const incorrectStake = ethers.parseEther("0.05"); // Less than 0.1 ETH
        let failed = false;
        try {
            await voting.connect(voter1).stakeToVote(1, { value: incorrectStake });
        } catch (error: any) {
            failed = true;
            // The revert reason sent back through RPC might be wrapped depending on the network runner, 
            // but the original revert string is typically inside the error message string.
            expect(error.message).to.include("Error: You must stake exactly the required amount!");
        }
        expect(failed).to.be.true;
    });

    it("should allow user to withdraw stake and successfully burn 20%", async function () {
        const stakeAmount = await voting.stakeAmount();
        
        // Setup: Voter 1 votes
        await voting.connect(voter1).stakeToVote(1, { value: stakeAmount });

        // Record dead address balance before withdraw
        const deadAddressBalanceBefore = await ethers.provider.getBalance(DEAD_ADDRESS);
        
        // Action: Voter 1 withdraws
        const tx = await voting.connect(voter1).withdrawStake();
        await tx.wait();

        // Verify withdrawal status
        const hasWithdrawn = await voting.hasWithdrawn(voter1.address);
        expect(hasWithdrawn).to.be.true;

        const burnPercentage = await voting.burnPercentage();
        const burnAmount = (BigInt(stakeAmount) * BigInt(burnPercentage)) / 100n;

        // Verify that dead address correctly received the 20% burn amount
        const deadAddressBalanceAfter = await ethers.provider.getBalance(DEAD_ADDRESS);
        expect(deadAddressBalanceAfter - deadAddressBalanceBefore).to.equal(burnAmount);
    });

    it("should prevent double withdrawal (Re-entrancy / Logic flow protection)", async function () {
        const stakeAmount = await voting.stakeAmount();
        await voting.connect(voter1).stakeToVote(1, { value: stakeAmount });
        
        // First withdrawal succeeds
        await voting.connect(voter1).withdrawStake();

        // Second withdrawal must fail
        let failed = false;
        try {
            await voting.connect(voter1).withdrawStake();
        } catch (error: any) {
            failed = true;
            expect(error.message).to.include("Error: You have already withdrawn your stake!");
        }
        expect(failed).to.be.true;
    });
});
