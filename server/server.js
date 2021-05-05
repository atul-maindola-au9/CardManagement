const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cardRoutes = require('./routes/card');

//app
const app = express();

//middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cardRoutes);

//db
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('DB connected');
	})
	.catch((err) => console.log('connection failed', err));

//port
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`App is running on ${port}`);
});
