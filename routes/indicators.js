const express = require('express');
const router = express.Router();

const {getTAData, getAllIndicators, getIndicatorByID} = require('../controllers/indicatorsController');

router
	.get('/', getAllIndicators)
	.get('/id/:id', getIndicatorByID)
	.post('/', getTAData);

module.exports = router;