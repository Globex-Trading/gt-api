
/* eslint-disable */
const csvHandler = require('../../utilities/csvHandler');
jest.mock('../../utilities/csvHandler', () => ({
	doSomething: jest.fn(),
	parseCSVDataToArrayFromAFile:jest.fn((val1,val2,val3)=>{
			return 2
	})
  }));

const { generateARandomUUID } = require('../../utilities/uuidHelper');
const { read1HourData, read5MinData, read1DayData ,getCSVToArray} = require('../../utilities/priceDataStoreUtility');


// describe('utilites Test for csvHandler', () => {
// 	it('random uuid type is string', () => {
// 		expect(typeof parseCSVDataToArrayFromAFile('sas/asa/', 'sasa', 'as')).toBe('string');
// 	});
// 	// it('random uuid length>5', () => {
// 	// 	expect(generateARandomUUID().length >= 5).toBe(true);
// 	// });
// });

describe('mock one', () => {
	// const addMock = jest.spyOn(csvHandler, "parseCSVDataToArrayFromAFile");
	// addMock.mockImplementation(() => 2);

	
	it('mock one 5min', async() => {
		expect(await getCSVToArray('default','a/','5m')).toEqual(2);
	});

	it('mock one 1h', async() => {
		expect(await getCSVToArray('default','a/','1h')).toEqual(2);
	});

	it('mock one 1D', async() => {
		expect(await getCSVToArray('default','a/','1D')).toEqual(2);
	});

	it('mock one 8D', async() => {
		expect(await getCSVToArray('default','a/','8D')).toEqual([]);
	});


});





describe('utilites Test for gererate a random id', () => {
	it('random uuid type is string', () => {
		expect(typeof generateARandomUUID()).toBe('string');
	});
	it('random uuid length>5', () => {
		expect(generateARandomUUID().length >= 5).toBe(true);
	});
});


describe('utilites Test for 5min data reader', () => {
	const data = ["2017-05-11", "16:00:00", "73.296", "73.296", "73.296", "73.296", "100", "0"]

	it('output is object', () => {
		expect(typeof read5MinData(data)).toBe('object');
	});
	it('output object has all 7 keys', () => {
		expect(
			('open_time' in read5MinData(data)) && ('close_time' in read5MinData(data)) && ('open_price' in read5MinData(data)) &&
			('close_price' in read5MinData(data)) && ('high_price' in read5MinData(data)) && ('low_price' in read5MinData(data)) &&
			('volume' in read5MinData(data))).toBe(true);
	});
	it('output object has all 7 values', () => {
		expect(
			((read5MinData(data).open_time) && (read5MinData(data).close_time) && (read5MinData(data).open_price) &&
				(read5MinData(data).close_price) && (read5MinData(data).high_price) && (read5MinData(data).low_price) &&
				(read5MinData(data).volume)) != null).toBe(true);
	});

});

describe('utilites Test for iday data reader', () => {
	const data = ["2017-05-11", "16:00:00", "73.296", "73.296", "73.296", "73.296", "100", "0"]

	it('output is object', () => {
		expect(typeof read1DayData(data)).toBe('object');
	});
	it('output object has all 7 keys', () => {
		expect(
			('open_time' in read1DayData(data)) && ('close_time' in read1DayData(data)) && ('open_price' in read1DayData(data)) &&
			('close_price' in read1DayData(data)) && ('high_price' in read1DayData(data)) && ('low_price' in read1DayData(data)) &&
			('volume' in read1DayData(data))).toBe(true);
	});
	it('output object has all 7 values', () => {
		expect(
			((read1DayData(data).open_time) && (read1DayData(data).close_time) && (read1DayData(data).open_price) &&
				(read1DayData(data).close_price) && (read1DayData(data).high_price) && (read1DayData(data).low_price) &&
				(read1DayData(data).volume)) != null).toBe(true);
	});

});

describe('utilites Test for 1h data reader', () => {
	const data = ["2017-05-11", "16:00:00", "73.296", "73.296", "73.296", "73.296", "100", "0"]

	it('output is object', () => {
		expect(typeof read1HourData(data)).toBe('object');
	});
	it('output object has all 7 keys', () => {
		expect(
			('open_time' in read1HourData(data)) && ('close_time' in read1HourData(data)) && ('open_price' in read1HourData(data)) &&
			('close_price' in read1HourData(data)) && ('high_price' in read1HourData(data)) && ('low_price' in read1HourData(data)) &&
			('volume' in read1HourData(data))).toBe(true);
	});
	it('output object has all 7 values', () => {
		expect(
			((read1HourData(data).open_time) && (read1HourData(data).close_time) && (read1HourData(data).open_price) &&
				(read1HourData(data).close_price) && (read1HourData(data).high_price) && (read1HourData(data).low_price) &&
				(read1HourData(data).volume)) != null).toBe(true);
	});
	it('open time has correct format', () => {
		expect(/^\d+$/.test(read1HourData(data).open_time)).toBe(true);
	});

});



