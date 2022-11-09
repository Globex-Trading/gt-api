const { User } = require('../models/user');
const asyncHandler = require('express-async-handler');


const getItemList = asyncHandler(async (req, res) => {
	//An array of alert IDs
	const userid = req.body.userid;

	if (!userid) {
		res.status(200);
		throw new Error('userid not found');
	}

	//get alert objects from alertId
	const data = await User.findById(userid);


	if (!data) {
		res.status(404).json({ msg: 'cannot find user' });

	}

	res.status(201).json(data.notification_items);



});



exports.getItemList = getItemList;



