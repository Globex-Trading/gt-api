const express =	require('express');
const {getCandleStickPastData, getLinePastData} = require('../controllers/tradingDataController');
const router = express.Router();

router
	.post('/candle-stick', getCandleStickPastData)
	.post('/line', getLinePastData);

module.exports = router;