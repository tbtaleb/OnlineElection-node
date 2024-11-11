const Favourite = require('/models/Favourite');
const Result = require('/models/Result');

exports.castFavourite = async (req, res) => {
  const { userId, candidateId } = req.body;

  try {
    await Favourite.create({ userId, candidateId });
    
    // Update the vote count in the results
    const result = await Result.findOne({ where: { candidateId } });
    if (result) {
      await result.increment('Favourites');
    } else {
      await Result.create({ candidateId, Favourites: 1 });
    }

    res.status(200).json({ message: 'Favourite cast successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
