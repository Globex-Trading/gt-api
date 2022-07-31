const express = require('express');
const router = express.Router();

const {triggerAlerts,getToken, addAlert} = require('../controllers/alertsController');

router
	.post('/trigger-alerts', triggerAlerts)
	.post('/gettoken', getToken)
	.post('/add-alert', addAlert);

module.exports = router;