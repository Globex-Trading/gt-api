const mongoose = require('mongoose');

const symbolSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 255
	},
	providedName: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 255
	},
	provider: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Provider',
		required: true
	}
});

const symbolModel = mongoose.model('Symbol', symbolSchema);

exports.schema = symbolSchema;
exports.Symbol = symbolModel;