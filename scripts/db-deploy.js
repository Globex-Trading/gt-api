require('dotenv').config();
const mongoose = require('mongoose');

const {initDBDeploy} = require('../db/deployDB');

//Set up Database
mongoose.connect(process.env.MONGODB_CONNECT_URI)
	.then(async () => {
		console.log('Connected to MongoDB...');
		await initDBDeploy();
		mongoose.disconnect();
	})
	.catch(err => console.error('Could not connect to MongoDB...', err));
