const symbolsService = require('../services/symbolService');

const getAllSymbolsWithProviders = async (req, res) => {
	const symbols = await symbolsService.getAllSymbolsWithProviders();
	return res.json({
		code: 200,
		status: 'OK',
		message: 'Data Fetched Successfully.',
		data: symbols,
	});
};

const getSymbolsByProviderID = async (req, res) => {
	const providerID = req.params.provider_id;
	if (!providerID) return res.json({
		code: 201,
		status: 'MISSING_INPUTS',
		message: 'Provider ID is missing.',
	});

	const symbols = await symbolsService.getSymbolsByProviderID(providerID);

	return res.json({
		code: 200,
		status: 'OK',
		message: 'Data Fetched Successfully.',
		data: symbols,
	});
};

exports.getAllSymbolsWithProviders = getAllSymbolsWithProviders;
exports.getSymbolsByProviderID = getSymbolsByProviderID;