// /api/users
const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser,
	getMe,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');


//register
router.post('/', registerUser);
//login
router.post('/login', loginUser);

//profile
router.get('/me', protect, getMe);

module.exports = router;

