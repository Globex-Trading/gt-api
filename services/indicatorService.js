// fetch all indicators and details from database
const {Indicator} = require('../models/indicator');
const getAllIndicators = async () => {
	try {
		return await Indicator.find();
	} catch (error) {
		console.log(error);
		return null;
	}
};

const getIndicatorByID = async (id) => {
	try {
		return await Indicator.findById(id);
	} catch (error) {
		console.log(error);
		return null;
	}
};

module.exports = {
	getAllIndicators,
	getIndicatorByID,
};