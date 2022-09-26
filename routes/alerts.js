const express = require('express');
const router = express.Router();

const {triggerAlerts,getToken, addAlert, getAlertsByUserID} = require('../controllers/alertsController');

router
	.get('/:userID', getAlertsByUserID)
	.post('/trigger-alerts', triggerAlerts)
	.post('/add-alert',addAlert)
	.post('/gettoken', getToken);
	

module.exports = router;