const { User } = require('../models/user');
const asyncHandler = require('express-async-handler');
const { getSymbolAndProviderByID } = require('../services/symbolService');


const saveItem = asyncHandler(async (req, res) => {

	const {symbolId, userId } = req.body;

	// Validation
	if (!symbolId || !userId ) {
		res.status(400);
		throw new Error('Please include all fields');
	}

	if (userId !== req.user._id ) {
		res.status(400);
		throw new Error('user id is not mached');
	}


	// data should be came from this format
	// const [symbolId, userId] = ['62f0960d419406d5471fb5c7', '633fac06895400a2403fea19'];

	
	//save to db 
	const updated=await User.findByIdAndUpdate(
		{ _id: userId },
		{ '$push': { 'watchlist_items': symbolId } }
	).exec(console.log('save successful'));


	if(!updated){
		res.status(400);
		throw new Error('update error in db');
	}

	res.status(200).json({msg:'save successful'});

});


const getItemList = asyncHandler(async (req, res) => {

	const {userId } = req.body;

	// Validation
	if ( !userId ) {
		res.status(400);
		throw new Error('Please include all fields');
	}

	if (userId !== req.user._id ) {
		res.status(400);
		throw new Error('user id is not mached');
	}


	// data should be came from this format
	// const userId =  '633fac06895400a2403fea19';

	
	//save to db 
	const user=await User.findById(userId);


	if(!user){
		res.status(400);
		throw new Error(' error in db');
	}

	var data = await Promise.all(user.watchlist_items.map(async(id) => {
		const symbol=await getSymbolAndProviderByID(id);
		return {
			id:id,
			symbol:symbol.name,
			provider:symbol.provider.slug
		};

	})
	);

	// console.log(await data);

	res.status(200).json(data);

});






module.exports = {
	saveItem,
	getItemList
};