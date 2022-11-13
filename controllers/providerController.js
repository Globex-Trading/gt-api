
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

const getSymbolsAndTimeframesForFetcherBySlug = async (req, res) => {
	const providerSlug = req.params.provider_slug;
	if (!providerSlug) return res.status(401);

	const provider = await providerService.getProviderBySlugWithSymbols(providerSlug);
	if (!provider) return res.status(401);

	const data = {};
	data['timeframes'] = provider.providedTimeFrames;
	const symbols = provider.symbols.map(s => {
		return s.providedName;
	});
	data['symbols'] = symbols;

	return res.status(200).json(data);
};

exports.getAllProvidersWithSymbols = getAllProvidersWithSymbols;
exports.getProviderBySlugWithSymbols = getProviderBySlugWithSymbols;
exports.getSymbolsAndTimeframesForFetcherBySlug = getSymbolsAndTimeframesForFetcherBySlug;