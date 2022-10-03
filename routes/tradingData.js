const express =	require('express');
const {getPastData} = require('../controllers/tradingDataController');
const router = express.Router();

router
	.post('/', getPastData);

module.exports = router;