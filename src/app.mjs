// app.mjs
import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));
// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, '../static')));
// Middleware to parse JSON in request body
app.use(express.json());

app.get('/booking', async (req, res) => {
	try {
		// Fetch property data from MongoDB
		const properties = await Property.find();
		// Send the booking page with property data
		res.sendFile(path.join(__dirname, '../public/booking.html'));
	} catch (error) {
		console.error('Error fetching properties:', error);
		res.status(500).send('Internal Server Error');
	}
});

app.get('/confirmation', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/confirmation.html'));
});

// MongoDB connection using WSL IP so docker can find database
mongoose.connect('mongodb://172.28.51.156:27017/mission5');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB');
});

// New model for property data
const Property = mongoose.model('Property', {
	imageUrl: String,
	propertyTitle: String,
	rent: Number,
	bathrooms: Number,
	bedrooms: Number,
	carParks: Number,
	dateAvailable: String,
});

// Route to fetch all properties
app.get('/fetchProperties', async (req, res) => {
	try {
		const properties = await Property.find();
		res.json(properties);
		console.log(properties);
	} catch (error) {
		console.error('Error fetching properties:', error);
		res.status(500).send('Internal Server Error');
	}
});

export default app;

app.listen(port, () => {
	console.log(`Example app listening on http://localhost:${port}`);
});
