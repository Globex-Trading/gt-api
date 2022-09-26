const express = require('express');
const router = express.Router();

const {triggerAlerts,getToken, addAlert} = require('../controllers/alertsController');

router
	.post('/trigger-alerts', triggerAlerts)
	.post('/add-alert',addAlert)
	.post('/gettoken', getToken);
	

module.exports = router;