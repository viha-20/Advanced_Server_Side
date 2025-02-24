// models/Cat.js
const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
  name: String,
  image: String, // image file path or URL
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Cat', CatSchema);
