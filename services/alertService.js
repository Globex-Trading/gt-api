const {Alert} = require('../models/alert');

const addAlert = async (provider, symbol, user, alert_type) => {
	const newAlert = new Alert({
		provider: provider,
		symbol: symbol,
		user: user,
		alert_type: alert_type
	});
	try {
		return await newAlert.save();

	}catch (error) {
		console.log(error);
		return null;
	}
};

module.exports = {
	addAlert
};