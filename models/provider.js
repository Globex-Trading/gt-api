const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
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
	},
	providedTimeFrames: {
		type: [String],
		required: true
	}
});

const providerModel = mongoose.model('Provider', providerSchema);

exports.schema = providerSchema;
exports.Provider = providerModel;