const Celebrity = require('../models/celebrity');

const celebrityController = {
  getCelebrities: (req, res) => {
    const celebrities = Celebrity.getAll().map(celebrity => celebrity.name);
    res.json(celebrities);
  },

  searchCelebrity: (req, res) => {
    const name = req.query.name;
    const celebrity = Celebrity.getByName(name);
    if (celebrity) {
      res.json(celebrity);
    } else {
      res.status(404).json({ error: 'Celebrity not found' });
    }
  },
};

module.exports = celebrityController;