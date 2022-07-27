const express = require('express');
const router = express.Router();

const alertsController = require('../controllers/alertsController');

router.post('/trigger-alerts', alertsController.triggerAlerts);

module.exports = router;