require('dotenv').config();
const mongoose = require('mongoose');

const providerSeeder = require('./providerSeeder');
const symbolSeeder = require('./symbolSeeder');
const alertTypeSeeder = require('./alertTypeSeeder');

const runSeeder = async () => {
	const seederArray = [providerSeeder, symbolSeeder, alertTypeSeeder];

	for (const seeder of seederArray) {
		await seeder.seed();
	}
};



//Set up Database
mongoose.connect(process.env.MONGODB_CONNECT_URI)
	.then(async () => {
		console.log('Connected to MongoDB...');
		await runSeeder();
	})
	.catch(err => console.error('Could not connect to MongoDB...', err));