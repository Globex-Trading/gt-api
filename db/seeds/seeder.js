const providerSeeder = require('./providerSeeder');
const symbolSeeder = require('./symbolSeeder');

const runInitialSeeder = async () => {
	const seederArray = [providerSeeder, symbolSeeder];

	for (const seeder of seederArray) {
		await seeder.seed();
	}
};

exports.runInitialSeeder = runInitialSeeder;