const express = require('express');
const router = express.Router();

const symbolsController = require('../controllers/symbolController');

router.get('/', symbolsController.getAllSymbolsWithProviders);
router.get('/provider/id/:provider_id', symbolsController.getSymbolsByProviderID);

module.exports = router;