const fileHandler = require('../utilities/fileHandler');
const priceDataStoreUtility = require('../utilities/priceDataStoreUtility');

const priceDataStoreService = require('../services/priceDataStoreService');
const symbolSevice = require('../services/symbolService');

const storePriceData = async (req,res) => {
	const { symbol_id: symbolID, interval: timeInterval } = req.body;
	const dataFile = req.file;

	//Validate Data
	if(!symbolID || !timeInterval || !dataFile) {
		res.json({ code: 201, status: 'MISSING_INPUTS', message: 'Missing Inputs!'});
		return;
	}

	//Get details of the symbol and provider from DB to verify
	const symbol = await symbolSevice.getSymbolAndProviderByID(symbolID);
	if (!symbol || !symbol.provider) {
		res.json({ code: 201, status: 'INVALID_SYMBOL_ID', message: 'Invalid Symbol ID!'});
		return;
	}
	const symbolProvidedName = symbol.providedName;
	const providerSlug = symbol.provider.slug;

	//Check if the given interval is correct
	if(!symbol.provider.providedTimeFrames.includes(timeInterval)) {
		res.json({ code: 201, status: 'INVALID_INTERVAL', message: 'Invalid Time Interval!'});
		return;
	}

	//Get priceData from CSV to an array
	const priceData = await priceDataStoreUtility.getCSVToArray('default', dataFile.path, timeInterval);
	console.log('Read rows -', priceData.length);

	//Save data to DB
	await priceDataStoreService.upsertPriceData(providerSlug, symbolProvidedName, timeInterval, priceData);

	//Send Response
	res.json({ code: 200, status: 'OK', message: 'Ok'});

	//Remove the file once everything is done.
	fileHandler.fileUnlinkAsync(dataFile.path);

};

exports.storePriceData = storePriceData;