const express = require('express');
const router = express.Router();

const {priceDataStoreUploadMulter} = require('../config/multerConfig');
const priceDataStoreController = require('../controllers/priceDataStoreController');

router.post('/upload', priceDataStoreUploadMulter, priceDataStoreController.storePriceData);

module.exports = router;