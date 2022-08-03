require('dotenv').config();
const mongoose = require('mongoose');

const migrate = require('./migration/migrate');
const seeder = require('./seeds/seeder');


const deployDB = async () => {
	await migrate.runInitialCollectionsMigration();
	console.log('Initial Migration Finished.');

	await seeder.runInitialSeeder();
	console.log('Initial Seeding Finished.');

	await migrate.runPriceDataCollectionMigration();
	console.log('Price Data Collections Migration Finished.');
};



//Set up Database
mongoose.connect(process.env.MONGODB_CONNECT_URI)
	.then(async () => {
		console.log('Connected to MongoDB...');
		await deployDB();
		mongoose.disconnect();
	})
	.catch(err => console.error('Could not connect to MongoDB...', err));