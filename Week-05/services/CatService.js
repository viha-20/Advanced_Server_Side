// services/CatService.js
const Cat = require('../models/Cat');

class CatService {
  // Get a random cat from the collection
  async getRandomCat() {
    const count = await Cat.countDocuments();
    const random = Math.floor(Math.random() * count);
    const cat = await Cat.findOne().skip(random);
    return cat;
  }

  // Update vote for a cat (like or dislike)
  async vote(catId, action) {
    const update = action === 'like' ? { $inc: { likes: 1 } } : { $inc: { dislikes: 1 } };
    const cat = await Cat.findByIdAndUpdate(catId, update, { new: true });
    return cat;
  }

  // Get top liked cats (default limit 5)
  async getTopLikedCats(limit = 5) {
    const cats = await Cat.find().sort({ likes: -1 }).limit(limit);
    return cats;
  }

  // Get cats by an array of IDs
  async getCatsByIds(ids) {
    const cats = await Cat.find({ _id: { $in: ids } });
    return cats;
  }
}

module.exports = new CatService();
