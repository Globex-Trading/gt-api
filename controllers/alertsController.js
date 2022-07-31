/* eslint-disable no-mixed-spaces-and-tabs */
const {sendAlerts}=require('../helper/sendAlerts');
const { Alert } = require('../models/alert');
const { User } = require('../models/user');
const asyncHandler = require('express-async-handler');

const triggerAlerts =asyncHandler( async(req,res) => {
	//An array of alert IDs
	const alert_ids = req.body.alert_ids;

	if (!alert_ids) {
		res.status(200);
		throw new Error('alertIDs not found');
	}


	res.status(201).json(alert_ids);


	//get alert objects from alertId
	const alertObjects = await Alert.find().where('_id').in(alert_ids).exec();
	// const alertObjects=[
	// 	{provider:'binance',
	// 		symbol:'btc',
	// 		trigger_price:'10000',
	// 		user:'62e6a546ee10619bd092086f'
	// 	},
	// 	{provider:'binance',
	// 		symbol:'eth',
	// 		trigger_price:'2000',
	// 		user:'62e6a7be2a6393df82fd63a8'},
	// ];


	alertObjects.forEach(async function(itm){
		
		//get alert from each object 
		const msg=itm.trigger_price;


		//get config token list from db using user id
		const user = await User.findById(itm.user).exec();
		const configTokens=user.config_tokens;

	
		configTokens.map((token)=>{sendAlerts(token,msg);});
	});



});


const getToken =asyncHandler( async (req,res) => {
	//get config token and user ID from react app
	const { configToken, userID } = req.body;
	
	if (!configToken || !userID) {
		res.status(401);
		throw new Error('configToken or userID not found');
	}
	res.status(201).json({
		configToken: configToken,
		userID: userID
	});

	
	//save to db (configToken, userID)
	const updated=await User.findByIdAndUpdate(
		{ _id: userID},
		{'$push': { 'config_tokens': configToken } }
	  ).exec(console.log('user not found'));

	 
});



module.exports = {
	triggerAlerts,
	getToken,
	
};