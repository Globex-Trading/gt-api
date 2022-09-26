const Joi = require('joi');

const candleStickValidationSchema = Joi.object({
	provider: Joi.string().required(),
	symbol: Joi.string().required(),
	interval: Joi.string().required(),
	start: Joi.number().required(),
	end: Joi.number().required(),
});

const lineValidationSchema = Joi.object({
	provider: Joi.string().required(),
	symbol: Joi.string().required(),
	interval: Joi.string().required(),
	start: Joi.number().required(),
	end: Joi.number().required(),
});

module.exports = {
	candleStickValidationSchema,
	lineValidationSchema
};