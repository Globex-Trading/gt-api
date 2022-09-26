const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { first_name, last_name, email, password, user_type, is_deleted } = req.body;
	test1();
	// Validation
	if (!first_name || !last_name || !email || !password || !user_type) {
		res.status(400);
		throw new Error('Please include all fields');
	}
	
	// Find if user already exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('Email already used');
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// // Create user
	const user = await User.create({
		first_name,
		last_name,
		email,
		password: hashedPassword,
		user_type,
		is_deleted

	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			token: generateToken(user._id,user.user_type),
		});
	} else {
		res.status(400);
		// eslint-disable-next-line no-undef
		throw new error('Invalid user data');
	}
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	// Check user and passwords match
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user._id,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			token: generateToken(user._id,user.user_type),
		});
	} else {
		res.status(401);
		throw new Error('Invalid credentials');
	}
});

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
	const user = {
		id: req.user._id,
		email: req.user.email,
		first_name: req.user.first_name,
		last_name: req.user.last_name,
	};
	res.status(200).json(user);
});

// Generate token
const generateToken = (id,type) => {
	return jwt.sign({ id , type }, process.env.JWT_SECRET, {
		expiresIn: '15d',
	});
};

const test1 = (id,type) => {
	console.log('nikn');
};

module.exports = {
	registerUser,
	loginUser,
	getMe,
};