const express = require('express');
const router = express.Router();

const {getTAData} = require('../controllers/indicatorsController');

router
	.get('/', getTAData);
	
	

module.exports = router;