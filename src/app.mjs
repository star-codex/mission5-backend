// Server-side code using ES6 syntax
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
// Middleware to parse JSON in request body
app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

mongoose.connect('mongodb://mongo:27017/mission5');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB');
});

const Message = mongoose.model('Message', {
	message: String,
});

app.post('/submit', async (req, res) => {
	try {
		const { message } = req.body;
		const newMessage = new Message({ message });
		await newMessage.save();
		res.send('Message submitted successfully!');
	} catch (error) {
		console.error('Error submitting message:', error);
		res.status(500).send('Internal Server Error');
	}
});

app.get('/fetch', async (req, res) => {
	try {
		const messages = await Message.find();
		res.json(messages);
	} catch (error) {
		console.error('Error fetching messages:', error);
		res.status(500).send('Internal Server Error');
	}
});

export default app;

app.listen(port, () => {
	console.log(`Example app listening on http://localhost:${port}`);
});
