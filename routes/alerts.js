const express = require('express');
const router = express.Router();

const {triggerAlerts,getToken} = require('../controllers/alertsController');

router
	.post('/trigger-alerts', triggerAlerts)
	.post('/gettoken', getToken);
	

module.exports = router;