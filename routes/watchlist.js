// /watchlist
const express = require('express');
const router = express.Router();
const {
	saveItem,
	getItemList,
	removeItem
} = require('../controllers/watchlistController');

const { protect } = require('../middleware/authMiddleware');


//save item to the watchlist
router.post('/saveitem',protect,  saveItem);
router.post('/getitemlist', protect, getItemList);
router.post('/removeitem',protect,  removeItem);


module.exports = router;

