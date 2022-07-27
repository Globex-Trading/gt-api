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

//get Routes
const alerts = require('./routes/alerts');
const crypto = require('./routes/crypto');

//Set Routers
app.use('/alerts', alerts);
app.use('/crypto', crypto);

exports.app = app;