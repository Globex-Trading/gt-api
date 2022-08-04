const {parse} = require('csv-parse');
const fs = require('fs');
const {finished} = require('stream/promises');

const parseCSVDataToArrayFromAFile = async (filePath, delimiter, objectGenerator) => {
	const dataArray = [];

	const parser = parse({delimiter: delimiter});

	parser.on('readable', () => {
		let record;
		while ((record = parser.read()) !== null) {
			dataArray.push(objectGenerator(record));
		}
	});
	parser.on('end', () => {
		console.log('Finished reading file.');
	});
	parser.on('error', (error) => {
		console.log(error);
	});

	const fileStreamParser =
		fs.createReadStream(filePath).pipe(parser);

	await finished(fileStreamParser);

	return dataArray;
};

exports.parseCSVDataToArrayFromAFile = parseCSVDataToArrayFromAFile;