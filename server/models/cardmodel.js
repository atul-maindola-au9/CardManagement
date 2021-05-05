const mongoose = require('mongoose');

const Cardschema = new mongoose.Schema({
	personname: {
		type: String,
		trim: true,
	},
	designation: {
		type: String,
		trim: true,
	},
	businessname: {
		type: String,
		trim: true,
	},
	shortdescription: {
		type: String,
		trim: true,
	},
	displayphoto: {
		type: String,
		trim: true,
	},
	whatsappnumber: {
		type: String,
		trim: true,
	},
	contacts: {
		type: String,
		trim: true,
	},
	singleaddress: {
		type: String,
		trim: true,
	},
});

const Card = new mongoose.model('Cards', Cardschema);
module.exports = Card;
