const Voting = artifacts.require("Voting");

contract('Voting', (accounts) => {

  it('should initialize with two candidates', async () => {
    const instance = await Voting.deployed();
    const count = await instance.candidatesCount();
    assert.equal(count, 2, "Initial candidates count should be 2");
  });

  it('should allow a voter to cast a vote', async () => {
    const instance = await Voting.deployed();
    const candidateId = 1;

    // Cast a vote
    await instance.vote(candidateId, { from: accounts[0] });

    // Check that the candidate's vote count has increased
    const candidate = await instance.candidates(candidateId);
    const voteCount = candidate.voteCount;
    assert.equal(voteCount, 1, "Candidate 1 should have 1 vote");

    // Check that the voter is marked as having voted
    const hasVoted = await instance.voters(accounts[0]);
    assert(hasVoted, "Voter should be marked as voted");
  });

  it('should prevent double voting', async () => {
    const instance = await Voting.deployed();
    const candidateId = 1;

    // Try to vote again with the same account
    try {
      await instance.vote(candidateId, { from: accounts[0] });
      assert.fail("Expected error not received");
    } catch (error) {
      assert(error.message.includes("You have already voted"), "Expected 'You have already voted' error");
    }
  });

});
