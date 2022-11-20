/* eslint-disable */
const {
	sma_inc,
	ema_inc,
	bbands_inc,
	wma_inc,

	rsi_inc,
	macd_inc,
	roc_inc,
	stoch_inc,
	obv_inc,

	md_inc,
	rocr_inc,
	vwma_inc
} = require('../helper/indicators');
const { getSymbolAndProviderByID } = require('../services/symbolService')
const { User } = require('../models/user');
const { getCandleModelForCollection } = require('../models/candleStick');
const asyncHandler = require('express-async-handler');
const indicatorService = require('../services/indicatorService');



const getTAData = asyncHandler(async (req, res) => {

	const { symbolId, timeframe, TI, startTime, endTime } = req.body;

	// Validation
	if (!symbolId || !timeframe || !TI || !startTime || !endTime) {
		res.status(400);
		throw new Error('Please include all fields');
	}

	// data should be came from this format
	// const [symbolId, timeframe, TI, startTime, endTime] = ['62f0960d419406d5471fb5c7', '15m', 'vwma', 1659934799999, 1659944699999]

	// get provider name and symbol using symbolid
	const symbol = await getSymbolAndProviderByID(symbolId)

	//get all c.stick data betwees time period
	const dbdata = await getCandleModelForCollection(symbol.provider.slug + '_' + symbol.name + '_' + timeframe).find({
		close_time: {
			$gte: startTime,
			$lte: endTime
		}
	})


	//get calculated data
	// console.log(dbdata)
	const output = await calculate(dbdata, TI)

	const newformat = { data: output, TI: TI }
	// console.log(await newformat)
	res.status(200).json(newformat);

});



// function structuredData(datalist) {
// 	var dataobj = {
// 		_id: [],
// 		open_time: [],
// 		close_time: [],
// 		open_price: [],
// 		close_price: [],
// 		high_price: [],
// 		low_price: [],
// 		volume: [],
// 		ta: []
// 	};
// 	datalist.forEach(element => {
// 		dataobj.open_time.push(element.open_time);
// 		dataobj.close_time.push(element.close_time);
// 		dataobj._id.push(element._id);
// 		dataobj.open_price.push(element.open_price);
// 		dataobj.close_price.push(element.close_price);
// 		dataobj.high_price.push(element.high_price);
// 		dataobj.low_price.push(element.low_price);
// 		dataobj.volume.push(element.volume);

// 	});

// 	return dataobj;
// }


function calculate(datalist, indicator) {

	switch (indicator.toLowerCase()) {
		case 'sma':
			return sma_inc(datalist)

		case 'ema':
			return ema_inc(datalist)


		case 'bbands':
			return bbands_inc(datalist)

		case 'wma':
			return wma_inc(datalist)

		// ---------

		case 'rsi':
			return rsi_inc(datalist)


		case 'macd':
			return macd_inc(datalist)


		case 'roc':
			return roc_inc(datalist)

		case 'stoch':
			return stoch_inc(datalist)


		case 'obv':
			return obv_inc(datalist)

		//------------

		case 'md':
			return md_inc(datalist)

		case 'rocr':
			return rocr_inc(datalist)

		case 'vwma':
			return vwma_inc(datalist)

		default:
			throw new Error('Invalid credentials');
	}
}

const getAllIndicators = async (req, res) => {
	console.log('---------------------------\n', req.body);
	try {
		const indicators = await indicatorService.getAllIndicators();
		indicators ?
			res.status(200).json({ status: 'SUCCESS', data: indicators }) :
			res.status(500).json({ status: 'FAILED', data: null });
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 'FAILED', data: null });
	}
}

const getIndicatorByID = async (req, res) => {
	if (!req.params.id) {
		return res.status(400).json({ status: 'FAILED', data: 'id is required' });
	}
	try {
		const indicator = await indicatorService.getIndicatorByID(req.params.id);
		indicator ?
			res.status(200).json({ status: 'SUCCESS', data: indicator }) :
			res.status(501).json({ status: 'FAILED', data: null });
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 'FAILED', data: null });
	}
}

module.exports = {
	getTAData,
	getAllIndicators,
	getIndicatorByID,
	calculate
};
