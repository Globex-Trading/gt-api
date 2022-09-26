const Joi = require('joi');

const alertValidationSchema = Joi.object({
	provider: Joi.string().required(),
	symbol: Joi.string().required(),
	trigger_price: Joi.number().required(),
	user: Joi.string().required(),
	alert_type: Joi.string().required(),
});

module.exports = {
	alertValidationSchema,
};
