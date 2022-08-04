const express = require('express');
const router = express.Router();

const providerController = require('../controllers/providerController');

router.get('/', providerController.getAllProvidersWithSymbols);
router.get('/slug/:provider_slug', providerController.getProviderBySlugWithSymbols);
router.get('/for-fetcher/slug/:provider_slug', providerController.getSymbolsAndTimeframesForFetcherBySlug);

module.exports = router;