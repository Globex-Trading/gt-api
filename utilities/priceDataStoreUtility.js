const csvHandler = require('./csvHandler');
const moment = require('moment');

const read1DayData = (record) => {
	const openTime = moment(record[0] + 'T' + record[1], moment.ISO_8601).unix();
	return {
		open_time: openTime,
		close_time: openTime + 86400 - 1,
		open_price: record[1],
		close_price: record[4],
		high_price: record[2],
		low_price: record[3],
		volume: record[5]
	};
};

const read1HourData = (record) => {
	const openTime = moment.utc(record[0] + 'T' + record[1], moment.ISO_8601).unix();
	return {
		open_time: openTime,
		close_time: openTime + 3600 - 1,
		open_price: record[2],
		close_price: record[5],
		high_price: record[3],
		low_price: record[4],
		volume: record[6]
	};
};

const read5MinData = (record) => {
	return {
		open_time: record[0] + record[1],
		close_time: 'c',
		open_price: record[2],
		close_price: record[5],
		high_price: record[3],
		low_price: record[4],
		volume: record[6]
	};
};

const getCSVToArray = async (provider, filePath, interval) => {
	if (provider === 'default') {
		switch (interval) {
			case '5m':
				return await csvHandler.parseCSVDataToArrayFromAFile(filePath, ',', read5MinData);
			case '1h':
				return await csvHandler.parseCSVDataToArrayFromAFile(filePath, ',', read1HourData);
			case '1D':
				return await csvHandler.parseCSVDataToArrayFromAFile(filePath, ',', read1DayData);
			default:
				return [];
		}
	} else {
		return [];
	}
};

exports.getCSVToArray = getCSVToArray;
exports.read5MinData = read5MinData;
exports.read1HourData = read1HourData;
exports.read1DayData = read1DayData;