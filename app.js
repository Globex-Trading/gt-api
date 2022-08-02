const express = require('express');
const mongoose = require('mongoose');
const { errorHandler } = require('./middleware/errorMiddleware');

require('dotenv').config();

const app = express();

// Express Incoming data Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set up Database
mongoose.connect(process.env.MONGODB_CONNECT_URI)
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect to MongoDB...', err));

//Set Middlewares
app.use(errorHandler);

//Set Routers
app.use('/alerts', require('./routes/alerts'));
app.use('/trading-data', require('./routes/tradingData'));
app.use('/users', require('./routes/userRoutes'));
app.use('/price-data-store', require('./routes/priceDataStore'));


exports.app = app;