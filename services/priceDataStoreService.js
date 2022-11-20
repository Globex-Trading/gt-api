const {getCandleModelForCollection} = require('../models/candleStick');

const upsertPriceData = async (provider, symbol, interval, priceData) => {
	const collectionName = `${provider}_${symbol}_${interval}`;
	const Candle = getCandleModelForCollection(collectionName);

	try {
		await Candle.insertMany(priceData, { ordered: false });
		console.log('Inserted');
	}catch (error) {
		console.log(error);
	}
};

exports.upsertPriceData = upsertPriceData;