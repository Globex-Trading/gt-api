const {User} = require('../../models/user');
const {Alert} = require('../../models/alert');
const {Provider} = require('../../models/provider');
const {Symbol} = require('../../models/symbol');

const up = async () => {
	await User.init();
	console.log('Users collection was created successfully.');
	await Alert.init();
	console.log('Alerts collection was created successfully.');
	await Provider.init();
	console.log('Providers collection was created successfully.');
	await Symbol.init();
	console.log('Symbols collection was created successfully.');
};

exports.up = up;