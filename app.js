const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Mongoose connection
mongoose.connect('mongodb://mongo:27017/mission5');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
	console.log('Connected to MongoDB');
});

// Define your routes
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
	console.log(`Example app listening on http://localhost:${port}`);
});
