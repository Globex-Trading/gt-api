const tulind = require('tulind');
const { promisify } = require('util');


//Promisify Functions
const sma_async = promisify(tulind.indicators.sma.indicator);
const ema_async = promisify(tulind.indicators.ema.indicator);
//MA
//BBANDS
//WMA


//
const rsi_async = promisify(tulind.indicators.rsi.indicator);
const macd_async = promisify(tulind.indicators.macd.indicator);
//ROC
//STOCH
//OBV

const sma_inc = async (data) => {
	// const d1 = data.map((d) => d.close);
	const results = await sma_async([data], [3]);
	// const d2 = results[0];
	// const diff = data.length - d2.length;
	// const emptyArray = [...new Array(diff)].map((d) => '');
	// const d3 = [...emptyArray, ...d2];
	// data = data.map((d, i) => ({ ...d, sma: d3[i] }));
	
	return results;
};

const ema_inc = async (data) => {
	// const d1 = data.map((d) => d.close);
	const results = await ema_async(data, [5]);
	// const d2 = results[0];
	// const diff = data.length - d2.length;
	// const emptyArray = [...new Array(diff)].map((d) => '');
	// const d3 = [...emptyArray, ...d2];
	// data = data.map((d, i) => ({ ...d, ema: d3[i] }));
	return results;
};

const rsi_inc = async (data) => {
	const d1 = data.map((d) => d.close);
	const results = await rsi_async([d1], [21]);
	const d2 = results[0];
	const diff = data.length - d2.length;
	const emptyArray = [...new Array(diff)].map((d) => '');
	const d3 = [...emptyArray, ...d2];
	data = data.map((d, i) => ({ ...d, rsi: d3[i] }));
	return data;
};


const macd_inc = async (data) => {
	const d1 = data.map((d) => d.close);
	const results = await macd_async([d1], [12, 26, 9]);
	const diff = data.length - results[0].length;
	const emptyArray = [...new Array(diff)].map((d) => '');

	const macd1 = [...emptyArray, ...results[0]];
	const macd2 = [...emptyArray, ...results[1]];
	const macd3 = [...emptyArray, ...results[2]];

	data = data.map((d, i) => ({
		...d,
		macd_fast: macd1[i],
		macd_slow: macd2[i],
		macd_histogram: macd3[i],
	}));
	return data;
};

module.exports = { sma_inc, ema_inc, rsi_inc, macd_inc };