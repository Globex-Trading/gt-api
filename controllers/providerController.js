
const providerService = require('../services/providerService');

const getAllProvidersWithSymbols = async (req,res) => {
	const providers = await providerService.getAllProvidersWithSymbols();
	res.json({
		code: 200,
		status: 'OK',
		message: 'Data Fetched Successfully.',
		data: providers,
	});
};

const getProviderBySlugWithSymbols = async (req,res) => {
	const providerSlug = req.params.provider_slug;
	if (!providerSlug) return res.json({
		code: 201,
		status: 'MISSING_INPUTS',
		message: 'Provider Slug is missing.',
	});

	const provider = await providerService.getProviderBySlugWithSymbols(providerSlug);
	if (!provider) return res.json({
		code: 201,
		status: 'INVALID_SLUG',
		message: 'No such provider slug exists.',
	});

	return res.json({
		code: 200,
		status: 'OK',
		message: 'Data Fetched Successfully.',
		data: provider,
	});
};

exports.getAllProvidersWithSymbols = getAllProvidersWithSymbols;
exports.getProviderBySlugWithSymbols = getProviderBySlugWithSymbols;