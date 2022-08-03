const express = require('express');
const router = express.Router();

const providerController = require('../controllers/providerController');

router.get('/', providerController.getAllProvidersWithSymbols);
router.get('/slug/:provider_slug', providerController.getProviderBySlugWithSymbols);

module.exports = router;