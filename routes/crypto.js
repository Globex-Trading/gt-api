const express =	require('express');
const {getCandleStickPastData} = require('../controllers/criptoController');
const router = express.Router();

router.post('/candle-stick', getCandleStickPastData);

module.exports = router;