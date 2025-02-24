// scripts/seed.js
const mongoose = require('mongoose');
const Cat = require('../models/Cat');

mongoose.connect('mongodb://localhost:27017/catnet', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected.');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const seedCats = async () => {
  await Cat.deleteMany({});
  const cats = [
    { name: 'Whiskers', image: '/images/cat1.jpg', likes: 0, dislikes: 0 },
    { name: 'Fluffy', image: '/images/cat2.jpg', likes: 0, dislikes: 0 },
    { name: 'Tiger', image: '/images/cat3.jpg', likes: 0, dislikes: 0 },
    { name: 'Mittens', image: '/images/cat4.jpg', likes: 0, dislikes: 0 },
    { name: 'Shadow', image: '/images/cat5.jpg', likes: 0, dislikes: 0 },
  ];
  await Cat.insertMany(cats);
  console.log('Database seeded!');
  mongoose.connection.close();
};

seedCats();
