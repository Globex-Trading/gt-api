const express =	require('express');
const {getCandleStickPastData} = require('../controllers/tradingDataController');
const router = express.Router();

router
	.post('/', getCandleStickPastData);

module.exports = router;