const Joi = require('joi');

const candleStickValidationSchema = Joi.object({
	symbol: Joi.string().required(),
	interval: Joi.string().required(),
	start: Joi.number().required(),
	end: Joi.number().required(),
});
module.exports = {
	candleStickValidationSchema
};