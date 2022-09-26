const {Alert} = require('../models/alert');
const {findProvider} = require('./providerService');

const addAlert = async (trigger_price, symbolID, userID, alert_type) => {
	try{
		const {provider, symbol} = await findProvider(symbolID);
		const newAlert = new Alert({
			provider: provider.slug,
			symbol: symbol.providedName,
			trigger_price: trigger_price,
			user: userID,
			alert_type: alert_type
		});

		return await newAlert.save();

	}catch (error) {
		console.log(error);
		return null;
	}
};

module.exports = {
	addAlert
};