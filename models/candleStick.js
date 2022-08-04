const mongoose = require('mongoose');

const candleSchema = new mongoose.Schema({
	open_time: {
		type: Number,
		required: true,
		index: {
			type: -1,
			unique: true
		}
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
	volume: {
		type: Number,
		required: true,
	}
});

const candleModelStore = {};

const getModelForCollection = (collectionName) => {
	if(!candleModelStore[collectionName]) {
		candleModelStore[collectionName] = mongoose.model('Candle', candleSchema, collectionName);
	}
	return candleModelStore[collectionName];
};

exports.getCandleModelForCollection = getModelForCollection;