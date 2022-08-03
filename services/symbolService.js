const {Symbol} = require('../models/symbol');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getSymbolAndProviderByID = async (symbolID) => {
	try {
		return await Symbol.findById(ObjectId(symbolID)).populate('provider').exec();
	} catch (error) {
		console.log(error);
		return null;
	}

};

const getAllSymbolsWithProviders = async () => {
	try {
		return await Symbol.find().populate('provider').exec();
	} catch (error) {
		console.log(error);
		return [];
	}
};

const getSymbolsByProviderID = async (providerID) => {
	try {
		return await Symbol.find({ provider: ObjectId(providerID)}).exec();
	} catch (e) {
		console.log(e);
		return [];
	}
};

exports.getSymbolAndProviderByID = getSymbolAndProviderByID;
exports.getAllSymbolsWithProviders = getAllSymbolsWithProviders;
exports.getSymbolsByProviderID = getSymbolsByProviderID;