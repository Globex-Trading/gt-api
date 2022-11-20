const mongoose = require('mongoose');

const alertTypeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 255
	},
	slug: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 255,
		unique: true
	}
});

const alertTypeModel = mongoose.model('AlertType', alertTypeSchema);

exports.AlertType = alertTypeModel;