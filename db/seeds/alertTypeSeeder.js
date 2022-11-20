const {AlertType} = require('../../models/alert_type');
const seed = async () => {
	const alertType = [
		{
			name: 'Crossing',
			slug: 'crossing'
		}
	];

	try {
		await AlertType.insertMany(alertType);
		console.log('Alert Types were Successfully Inserted.');
	}catch (error) {
		console.log(error);
	}
};

exports.seed = seed;
