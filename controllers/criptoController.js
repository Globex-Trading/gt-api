const cryptoService = require('../services/cryptoService');
const candleStickValidation = require('../validations/crypto/candleStick');

const getCandleStickPastData = async (req, res) => {
	const {error, value} = candleStickValidation.validate(req.body, {abortEarly: false});
	if (error) return res.status(400).json({status: 'FAILED', data: error.details});

	const {provider, symbol, interval, start, end} = value;

	const candles = await cryptoService.findCandleStickPastData(provider, symbol, interval, start, end);

	if(candles) {
		res.status(200).json(candles);
	}else {
		res.status(500).json({status: 'FAILED', data: 'Error while fetching candle stick data'});
	}
};

module.exports = {
	getCandleStickPastData
};