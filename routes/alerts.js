const express = require('express');
const router = express.Router();

const { triggerAlerts, getToken, addAlert, getAlertsByUserID, sendTest,removeAlert } = require('../controllers/alertsController');
const { protect } = require('../middleware/authMiddleware');

router
	.get('/:userID',protect, getAlertsByUserID)
	.post('/trigger-alerts', triggerAlerts)
	.post('/add-alert',protect, addAlert)
	.post('/gettoken',protect, getToken)
	.post('/sendtest', sendTest)
	.post('/removealert',protect,removeAlert);


module.exports = router;