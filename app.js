const express = require('express');
const mongoose = require('mongoose');
const pino = require('express-pino-logger');
const { errorHandler } = require('./middleware/errorMiddleware');
const {initDBDeploy} = require('./db/deployDB');


require('dotenv').config();

const app = express();

//Use Pino as the Logger
app.use(pino());

// Express Incoming data Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set up Database
mongoose.connect(process.env.MONGODB_CONNECT_URI)
	.then(() => {
		console.log('Connected to MongoDB...');
		initDBDeploy();
	})
	.catch(err => console.error('Could not connect to MongoDB...', err));

//Set Middlewares
app.use(errorHandler);

//Set Routers
app.use('/alerts', require('./routes/alerts'));
app.use('/trading-data', require('./routes/tradingData'));
app.use('/users', require('./routes/userRoutes'));
app.use('/price-data-store', require('./routes/priceDataStore'));
app.use('/providers', require('./routes/provider'));
app.use('/symbols', require('./routes/symbol'));

exports.app = app;