const express = require('express');
const router = express.Router();

const {getTAData} = require('../controllers/indicatorsController');

router
	.post('/', getTAData);
	
	

module.exports = router;