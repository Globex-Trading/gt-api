const {Provider} = require('../models/provider');
const {Symbol} = require('../models/symbol');

const getAllProvidersWithSymbols = async () => {
	try {
		return await Provider.aggregate([
			{
				$lookup: {
					from: Symbol.collection.name,
					localField: '_id',
					foreignField: 'provider',
					as: 'symbols',
				},
			},
		]).exec();
	} catch (e) {
		console.log(e);
		return [];
	}
};

const getProviderBySlugWithSymbols = async (providerSlug) => {
	try {
		const providers = await Provider.aggregate([
			{
				$match: {
					slug: providerSlug,
				},
			},
			{
				$lookup: {
					from: Symbol.collection.name,
					localField: '_id',
					foreignField: 'provider',
					as: 'symbols',
				},
			},
		]).exec();
		if(providers.length === 0) return null;
		else return providers[0];
	} catch (e) {
		console.log(e);
		return null;
	}
};

//find provider for specific symbol
const findProvider = async (symbolID) => {

	try{
		const symbol = await Symbol.findById(symbolID);
		const provider = await Provider.findById(symbol.provider);

		return {provider: provider, symbol: symbol};

	}catch (err) {
		console.log(err);
		return null;
	}

};

exports.getAllProvidersWithSymbols = getAllProvidersWithSymbols;
exports.getProviderBySlugWithSymbols = getProviderBySlugWithSymbols;
exports.findProvider = findProvider;