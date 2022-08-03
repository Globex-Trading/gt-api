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

exports.getAllProvidersWithSymbols = getAllProvidersWithSymbols;
exports.getProviderBySlugWithSymbols = getProviderBySlugWithSymbols;