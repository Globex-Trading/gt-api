const mongoose = require('mongoose');

const candleSchema = new mongoose.Schema({
	open_time: {
		type: Number,
		required: true,
	},
	close_time: {
		type: Number,
		required: true,
	},
	open_price: {
		type: Number,
		required: true,
	},
	close_price: {
		type: Number,
		required: true,
	},
	high_price: {
		type: Number,
		required: true,
	},
	low_price: {
		type: Number,
		required: true,
	},
});

const getModelForCollection = (collectionName) => {
	return mongoose.model('Candle', candleSchema, collectionName);
};

exports.getModelForCollection = getModelForCollection;