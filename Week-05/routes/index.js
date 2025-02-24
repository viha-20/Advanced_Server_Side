// routes/index.js
const express = require('express');
const router = express.Router();
const CatService = require('../services/CatService');

// Home page: Display a random cat and the last three liked cats from session
router.get('/', async (req, res) => {
  try {
    const cat = await CatService.getRandomCat();
    // Initialize likedCats array in session if not present
    if (!req.session.likedCats) {
      req.session.likedCats = [];
    }
    // Retrieve details for the last three liked cats
    let likedCats = [];
    if (req.session.likedCats.length > 0) {
      const lastThree = req.session.likedCats.slice(-3);
      likedCats = await CatService.getCatsByIds(lastThree);
    }
    res.render('index', { cat, likedCats });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Vote route: Process voting and update session for "like" votes
router.get('/vote/:catId/:action', async (req, res) => {
  const { catId, action } = req.params;
  if (!['like', 'dislike'].includes(action)) {
    return res.status(400).send('Invalid vote action');
  }
  try {
    await CatService.vote(catId, action);
    // For "like" action, add catId to session (store last three)
    if (action === 'like') {
      if (!req.session.likedCats) {
        req.session.likedCats = [];
      }
      req.session.likedCats.push(catId);
      if (req.session.likedCats.length > 3) {
        req.session.likedCats = req.session.likedCats.slice(-3);
      }
    }
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Top liked cats route
router.get('/top', async (req, res) => {
  try {
    const topCats = await CatService.getTopLikedCats();
    res.render('top', { topCats });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
