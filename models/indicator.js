const mongoose = require('mongoose');

const indicatorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		maxLength: 20,
		minLength: 1
	},

	newPane: {
		type: Boolean,
		required: true
	},

	chartType: {
		type: String,
		required: true,
		enum: ['line', 'bar', 'area', 'baseline']
	}
});

const indicatorModel = mongoose.model('Indicator', indicatorSchema);

exports.schema = indicatorSchema;
exports.Indicator = indicatorModel;