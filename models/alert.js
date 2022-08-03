const mongoose = require('mongoose');
require('./user');

const alertSchema = new mongoose.Schema({
	provider: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 255
	},
	symbol: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 255
	},
	trigger_price: {
		type: Number,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	is_triggered: {
		required: true,
		type: Boolean,
		default: false
	},
	alert_type: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 25,
		enum: ['Crossing'],
		default: 'Crossing'
	}
});

const alertModel = mongoose.model('Alert', alertSchema);

exports.schema = alertSchema;
exports.Alert = alertModel;