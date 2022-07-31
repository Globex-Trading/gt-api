const Joi = require('joi');

const validationSchema = Joi.object({
	provider: Joi.string().required(),
	symbol: Joi.string().required(),
	interval: Joi.string().required(),
	start: Joi.number().required(),
	end: Joi.number().required(),
});

module.exports = validationSchema;