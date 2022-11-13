// /watchlist
const express = require('express');
const router = express.Router();
const {
	getItemList,
} = require('../controllers/notificationController');

const { protect } = require('../middleware/authMiddleware');


router.post('/getnotification' ,protect, getItemList);


module.exports = router;

