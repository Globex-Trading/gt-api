const {getModelForCollection} = require('../models/candleStick');

const findCandleStickPastData = async (provider, symbol, interval, start, end) => {
	const collectionName = `${provider}_${symbol}_${interval}`;
	const Candle = getModelForCollection(collectionName);
	// find data from the database
	try {
		return await Candle.find({open_time: {$gte: start, $lte: end}});
	}catch (err) {
		console.log(err);
		return null;
	}
};

module.exports = {
	findCandleStickPastData
};