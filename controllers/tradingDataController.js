const tradingDataService = require('../services/tradingDataService');
const candleStickValidation = require('../validations/tradingData');

const getCandleStickPastData = async (req, res) => {
	const {error, value} = candleStickValidation.validate(req.body, {abortEarly: false});
	if (error) return res.status(400).json({status: 'FAILED', data: error.details});

	const {provider, symbol, interval, start, end} = value;

	const candles = await tradingDataService.findCandleStickPastData(provider, symbol, interval, start, end);

	if(candles) {
		res.status(200).json(candles);
	}else {
		res.status(500).json({status: 'FAILED', data: 'Error while fetching candle stick data'});
	}
};

const getLinePastData = async (req, res) => {
	console.log(req.body);
};

module.exports = {
	getCandleStickPastData,
	getLinePastData
};