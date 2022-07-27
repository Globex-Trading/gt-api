const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

// Express Incoming data Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set up Database
mongoose.connect(process.env.MONGODB_CONNECT_URI)
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect to MongoDB...', err));

//Set Routers
app.use('/alerts', require('./routes/alerts'));

exports.app = app;