const {Symbol} = require('../../models/symbol');
const {Provider} = require('../../models/provider');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const seed = async () => {
	//Fetch Binance provider ID
	const binanceProvider = await Provider.findOne({ slug: 'binance' });
	if(!binanceProvider) return;
	const binanceID = ObjectId(binanceProvider._id);

	//Binance Symbols
	const binanceSymbols = [
		{
			name: 'BTCUSDT',
			providedName: 'BTCUSDT',
			provider: ObjectId(binanceID)
		},
		{
			name: 'ETHUSDT',
			providedName: 'ETHUSDT',
			provider: ObjectId(binanceID)
		},
		{
			name: 'SOLUSDT',
			providedName: 'SOLUSDT',
			provider: ObjectId(binanceID)
		},
		{
			name: 'MATICUSDT',
			providedName: 'MATICUSDT',
			provider: ObjectId(binanceID)
		},
		{
			name: 'LINKUSDT',
			providedName: 'LINKUSDT',
			provider: ObjectId(binanceID)
		},
		{
			name: 'BNBUSDT',
			providedName: 'BNBUSDT',
			provider: ObjectId(binanceID)
		},
		{
			name: 'DOTUSDT',
			providedName: 'DOTUSDT',
			provider: ObjectId(binanceID)
		},
	];

	try {
		await Symbol.insertMany(binanceSymbols);
		console.log('Binance Symbols were Successfully Inserted.');
	} catch (error) {
		console.log(error);
	}

};

exports.seed =seed;