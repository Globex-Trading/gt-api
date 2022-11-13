const { User } = require('../models/user');
const asyncHandler = require('express-async-handler');
const { getSymbolAndProviderByID } = require('../services/symbolService');


const saveItem = asyncHandler(async (req, res) => {

	const { symbolId, userId } = req.body;

	// Validation
	if (!symbolId || !userId) {
		res.status(400);
		throw new Error('Please include all fields');
	}

	if (userId !== req.user._id.toString()) {

		res.status(401);
		throw new Error('user id is not mached');
	}


	// data should be came from this format
	// const [symbolId, userId] = ['62f0960d419406d5471fb5c7', '633fac06895400a2403fea19'];


	//save to db 
	await User.findByIdAndUpdate(
		{ _id: userId },
		{ '$push': { 'watchlist_items': symbolId } }
	).exec(console.log('save successful'));


	res.status(200).json({ msg: 'save successful' });

});


const getItemList = asyncHandler(async (req, res) => {

	const { userId } = req.body;

	// Validation
	if (!userId) {
		res.status(400);
		throw new Error('Please include all fields');
	}

	if (userId !== req.user._id.toString()) {
		res.status(400);
		throw new Error('user id is not mached');
	}


	// data should be came from this format
	// const userId =  '633fac06895400a2403fea19';


	//save to db 
	const user = await User.findById(userId);


	// if (!user) {
	// 	res.status(400);
	// 	throw new Error(' error in db');
	// }

	var data = await Promise.all(user.watchlist_items.map(async (id) => {
		const symbol = await getSymbolAndProviderByID(id);
		return {
			id: id,
			symbol: symbol.name,
			provider: symbol.provider.slug
		};

	})
	);

	// console.log(await data);

	res.status(200).json(data);

});


const removeItem = asyncHandler(async (req, res) => {

	const { symbolId, userId } = req.body;

	// Validation
	if (!symbolId || !userId) {
		res.status(400);
		throw new Error('Please include all fields');
	}

	if (userId !== req.user._id.toString()) {

		res.status(401);
		throw new Error('user id is not mached');
	}


	// data should be came from this format
	// const [symbolId, userId] = ['636b8bb5aaa1bf2ed613be63', '633fac06895400a2403fea19'];


	//save to db 
	await User.findByIdAndUpdate(
		{ _id: userId },
		{ '$pull': { 'watchlist_items': symbolId } }
	).exec(console.log('remove successful'));


	res.status(200).json({ msg: 'remove successful' });

});









module.exports = {
	saveItem,
	getItemList,
	removeItem
};