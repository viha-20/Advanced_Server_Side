const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const celebrityController = require('./controllers/celebrityController');

const app = express();
const PORT = 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// API routes
app.get('/celebrities', celebrityController.getCelebrities);
app.get('/search', celebrityController.searchCelebrity);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});