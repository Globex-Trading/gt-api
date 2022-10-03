const {getCandleModelForCollection} = require('../models/candleStick');
const {findProvider} = require('../services/providerService');

const findPastData = async (symbolID, interval, start, end) => {

	try{
		const {provider, symbol} = await findProvider(symbolID);
		const collectionName = `${provider.slug}_${symbol.providedName}_${interval}`;
		const Candle = getCandleModelForCollection(collectionName);
		// find data from the database
		return await Candle.find({open_time: {$gte: start, $lte: end}});
	}catch (err) {
		console.log(err);
		return null;
	}
};

module.exports = {
	findPastData: findPastData
};