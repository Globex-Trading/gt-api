// /api/users
const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser,
	getMe,
	renewToken
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');


//register
router.post('/', registerUser);
//login
router.post('/login', loginUser);

//renew access token
router.post('/renewtoken', renewToken);

//profile
router.get('/me', protect, getMe);

module.exports = router;

