const { alertValidationSchema } = require('../validations/alert');
const alertService = require('../services/alertService');
/* eslint-disable no-mixed-spaces-and-tabs */
const { sendAlerts } = require('../helper/sendAlertFB');
const { Alert } = require('../models/alert');
const { User } = require('../models/user');
const asyncHandler = require('express-async-handler');


//for trigger alerts
const triggerAlerts = asyncHandler(async (req, res) => {
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


	alertObjects.forEach(async function (itm) {

		//get alert from each object 
		const title = itm.symbol;
		const msg = `Price has been reached to $${itm.trigger_price.toString()} at ${new Date().toLocaleString()}`;


		//get config token list from db using user id
		const user = await User.findById(itm.user).exec();
		const configTokens = user.config_tokens;

		if(!itm.is_triggered) {

			configTokens.map((token) => {
				sendAlerts(token, title, msg);
			});

			user.notification_items.push({
				title: title,
				data: msg

			});

			user.save();

		
			//set isTriggered to true
			itm.is_triggered = true;
			itm.save();
		}

	});



});


const getToken = asyncHandler(async (req, res) => {
	//get config token and user ID from react app
	const { configToken, userID } = req.body;

	if (!configToken || !userID) {
		res.status(401);
		throw new Error('configToken or userID not found');
	}
	// res.status(201).json({
	// 	configToken: configToken,
	// 	userID: userID
	// });

	const user = await User.findById(userID);
	// console.log(user.id);
	if(user){
		const configtokens=user.config_tokens;
		if(configtokens.includes(configToken)){
			return res.status(200).json({ msg: 'token already exist' });
		}
	}


	//save to db (configToken, userID)
	// eslint-disable-next-line 
	const updated = await User.findByIdAndUpdate(
		{ _id: userID },
		{ '$push': { 'config_tokens': configToken } }
	).exec(console.log(''));
	return res.status(201).json({ msg: 'save successfull' });


});

//add new alert to the system
const addAlert = async (req, res) => {
	const { error, value } = alertValidationSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ status: 'FAILED', data: error.details });
	}
	const newAlert = await alertService.addAlert(value.trigger_price, value.symbol, value.user, value.alert_type);
	if (!newAlert) {
		return res.status(500).json({ status: 'FAILED', data: 'Alert could not be added' });
	}
	return res.status(200).json({ status: 'SUCCESS', data: newAlert });
};

//get all the alerts that set by a user
const getAlertsByUserID = async (req, res) => {
	const userID = req.params.userID;
	if (!userID) return res.status(401);

	try {
		const alerts = await alertService.getAlertsByUserID(userID);
		if (!alerts) {
			return res.status(500).json({ status: 'FAILED', data: 'Alerts could not be retrieved' });
		}
		return res.status(200).json({ status: 'SUCCESS', data: alerts });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ status: 'FAILED', data: 'Alerts could not be retrieved' });
	}

};

const sendTest = asyncHandler(async (req, res) => {
	//An array of alert IDs
	const { token, userid } = req.body;

	if (!token || !userid) {
		res.status(200);
		throw new Error('data not found');
	}




	// 	//get config token list from db using user id
	const user = await User.findById(userid).exec();
	

	sendAlerts(token, ' msg test');
	user.notification_items.push({
		title: 'tt',
		data: 'msg'

	});

	user.save();

});

const removeAlert = asyncHandler(async (req, res) => {
	
	const { alertID } = req.body;

	if (!alertID) {
		res.status(401);
		throw new Error('alertID not found');
	}

	const alert= await Alert.findById(alertID);

	if(!alert){
		return res.status(400).json({ msg: 'cannot find the alert' });
	}
	

	await Alert.findByIdAndRemove(alertID);
	// console.log(user.id);
	
	return res.status(200).json({ msg: 'alert successfully deleted' });
	


});

module.exports = {
	triggerAlerts,
	getToken,
	addAlert,
	getAlertsByUserID,
	removeAlert,
	sendTest

};