const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CardDB = require('../models/cardmodel');
mongoose.set('useFindAndModify', false);

router.post('/addcard', (req, res) => {
	const {
		personname,
		designation,
		businessname,
		shortdescription,
		displayphoto,
		whatsappnumber,
		contacts,
		singleaddress,
	} = req.body;
	console.log(req.body);

	const card = new CardDB({
		personname,
		designation,
		businessname,
		shortdescription,
		displayphoto,
		whatsappnumber,
		contacts,
		singleaddress,
	});
	card.save()
		.then((result) => {
			console.log('Result>>>', result);
			res.status(201).json({ post: result });
		})
		.catch((err) => {
			res.status(500);
		});
});

router.get('/card/raj-patel', (req, res) => {
	CardDB.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			console.log(data);
			res.status(200).send(data);
		}
	});
});

router.put('/editcard', (req, res) => {
	const {
		personname,
		designation,
		businessname,
		shortdescription,
		displayphoto,
		whatsappnumber,
		contacts,
		singleaddress,
	} = req.body;
	const { id } = req.body;
	CardDB.findOneAndUpdate(
		{ _id: id },
		{
			personname,
			designation,
			businessname,
			shortdescription,
			displayphoto,
			whatsappnumber,
			contacts,
			singleaddress,
		},
		{ new: true }
	).then((err, result) => {
		if (err) {
			return res.status(422).json({ error: err });
		} else {
			res.json('card updated', result);
		}
	});
});

router.delete('/deletecard', (req, res) => {
	const { cardId } = req.body;
	console.log(req.body);
	CardDB.deleteOne({ _id: cardId })
		.then((result) => {
			console.log('result', cardId);
			res.status(201).json(result);
		})
		.catch((err) => res.status(500).send(err));
});

module.exports = router;
