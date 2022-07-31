const {Provider} = require('../../models/provider');

const seed = async () => {
	let newProvider = new Provider({
		name: 'Binance',
		slug: 'binance',
		providedTimeFrames: ['1m', '5m', '15m', '1h', '4h', '1d', '1W', '1M']
	});
	try {
		await newProvider.save();
		console.log('Binance Provider saved.');
	} catch (error) {
		console.log(error);
	}
};

exports.seed =seed;