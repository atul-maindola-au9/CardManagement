const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//app
const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(require('./routes/card'));
//db
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
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
