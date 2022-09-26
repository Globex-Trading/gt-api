const migrate = require('./migration/migrate');
const seeder = require('./seeds/seeder');

const {Migration} = require('../models/migration');

const deployDB = async () => {
	await migrate.runInitialCollectionsMigration();
	console.log('Initial Migration Finished.');

	await seeder.runInitialSeeder();
	console.log('Initial Seeding Finished.');

	await migrate.runPriceDataCollectionMigration();
	console.log('Price Data Collections Migration Finished.');
};

const initDBDeploy = async () => {
	const res = await Migration.count();
	
	if(res > 0) {
		console.log('The DB has already been deployed.');
	} else {
		console.log('Preparing to start Database deployment.');
		await deployDB();
		console.log('Finishing DB Deployment.');
		await Migration.insertMany([{
			migration_name: 'Initial Deployment'
		}]);
		console.log('DB Deployment Successful.');
	}
};

exports.initDBDeploy = initDBDeploy;