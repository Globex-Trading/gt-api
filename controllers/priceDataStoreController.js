const fileHandler = require('../utilities/fileHandler');

const storePriceData = (req,res) => {
	const { symbol_id: symbolID, interval: timeInterval } = req.body;
	const dataFile = req.file;

	//Validate Data
	if(!symbolID || !timeInterval || !dataFile) {
		res.json({ code: 201, status: 'MISSING_INPUTS', message: 'Missing Inputs!'});
		return;
	}

	//Send Response
	res.json({ code: 200, status: 'OK', message: 'Ok'});

	//Remove the file once everything is done.
	fileHandler.fileUnlinkAsync(dataFile.path);

};

exports.storePriceData = storePriceData;