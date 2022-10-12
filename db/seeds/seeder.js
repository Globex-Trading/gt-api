const providerSeeder = require('./providerSeeder');
const symbolSeeder = require('./symbolSeeder');
const alertTypeSeeder = require('./alertTypeSeeder');
const indicatorSeeder = require('./indicatorSeeder');

const runInitialSeeder = async () => {
	const seederArray = [providerSeeder, symbolSeeder, indicatorSeeder];


	for (const seeder of seederArray) {
		await seeder.seed();
	}
};

exports.runInitialSeeder = runInitialSeeder;