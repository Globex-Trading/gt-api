const mongoose = require('mongoose');

const migrationSchema = new mongoose.Schema({
	migration_name: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 255
	},
});

const migrationModel = mongoose.model('Migration', migrationSchema);

exports.schema = migrationSchema;
exports.Migration = migrationModel;