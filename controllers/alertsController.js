const {sendAlerts}=require('../helper/sendAlerts');

const triggerAlerts = (req,res) => {
	//An array of alert IDs
	const alert_ids = req.body.alert_ids;

	if (!alert_ids) {
		res.status(401);
		throw new Error('alertIDs not found');
	}

	console.log(alert_ids);
	res.status(201).json(alert_ids);

	//TODO
	//get relevant config tokens using userID
	const configTokens=['123365','255522','782321'];

	//TODO
	//get alert object from db and and get msg (price)
	const msg='msg in alert';

	//send push notifications
	configTokens.map((token)=>{sendAlerts(token,msg);});

	

};


const getToken = (req,res) => {
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

	//TODO
	//save to db (configToken, userID)
};



module.exports = {
	triggerAlerts,
	getToken,
    
};