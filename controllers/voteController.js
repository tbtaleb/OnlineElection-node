const Vote = require('/models/Vote');
const Result = require('/models/Result');

exports.castVote = async (req, res) => {
  const { userId, candidateId } = req.body;

  try {
    await Vote.create({ userId, candidateId });
    
    // Update the vote count in the results
    const result = await Result.findOne({ where: { candidateId } });
    if (result) {
      await result.increment('votes');
    } else {
      await Result.create({ candidateId, votes: 1 });
    }

    res.status(200).json({ message: 'Vote cast successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
