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

exports.getSymbolAndProviderByID = getSymbolAndProviderByID;