const tulind = require('tulind');
const { promisify } = require('util');


//Promisify Functions
const sma_async = promisify(tulind.indicators.sma.indicator);
const ema_async = promisify(tulind.indicators.ema.indicator);
//MA
//BBANDS
const bbands_async = promisify(tulind.indicators.bbands.indicator);
//WMA
const wma_async = promisify(tulind.indicators.wma.indicator);


//
const rsi_async = promisify(tulind.indicators.rsi.indicator);
const macd_async = promisify(tulind.indicators.macd.indicator);
//ROC
const roc_async = promisify(tulind.indicators.roc.indicator);

//STOCH
//high,low,close
const stoch_async = promisify(tulind.indicators.stoch.indicator);

//OBV
//close,vol
const obv_async = promisify(tulind.indicators.obv.indicator);

const sma_inc = async (data) => {
	console.log(tulind.indicators.sma);
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
	const results = await ema_async([data], [3]);
	// const d2 = results[0];
	// const diff = data.length - d2.length;
	// const emptyArray = [...new Array(diff)].map((d) => '');
	// const d3 = [...emptyArray, ...d2];
	// data = data.map((d, i) => ({ ...d, ema: d3[i] }));
	return results;
};

const bbands_inc = async (data) => {
	// const d1 = data.map((d) => d.close);
	const results = await bbands_async([data], [3,2]);
	// const d2 = results[0];
	// const diff = data.length - d2.length;
	// const emptyArray = [...new Array(diff)].map((d) => '');
	// const d3 = [...emptyArray, ...d2];
	// data = data.map((d, i) => ({ ...d, ema: d3[i] }));
	return results;
};

const wma_inc = async (data) => {
	// const d1 = data.map((d) => d.close);
	const results = await wma_async([data], [2]);
	// const d2 = results[0];
	// const diff = data.length - d2.length;
	// const emptyArray = [...new Array(diff)].map((d) => '');
	// const d3 = [...emptyArray, ...d2];
	// data = data.map((d, i) => ({ ...d, ema: d3[i] }));
	return results;
};


//---------------------------------------

const rsi_inc = async (data) => {
	const results = await rsi_async([data], [2]);
	// const d2 = results[0];
	// const diff = data.length - d2.length;
	// const emptyArray = [...new Array(diff)].map((d) => '');
	// const d3 = [...emptyArray, ...d2];
	// data = data.map((d, i) => ({ ...d, ema: d3[i] }));
	return results;
};

//
const macd_inc = async (data) => {
	const results = await macd_async([data], [2,3,5]);
	// const d2 = results[0];
	// const diff = data.length - d2.length;
	// const emptyArray = [...new Array(diff)].map((d) => '');
	// const d3 = [...emptyArray, ...d2];
	// data = data.map((d, i) => ({ ...d, ema: d3[i] }));
	return results;
};


const roc_inc = async (data) => {
	// const d1 = data.map((d) => d.close);
	const results = await roc_async([data], [2]);
	// const d2 = results[0];
	// const diff = data.length - d2.length;
	// const emptyArray = [...new Array(diff)].map((d) => '');
	// const d3 = [...emptyArray, ...d2];
	// data = data.map((d, i) => ({ ...d, ema: d3[i] }));
	return results;
};

const stoch_inc = async (data1,data2,data3) => {
	// const d1 = data.map((d) => d.close);
	const results = await stoch_async([data1,data2,data3],[3,2,2]);
	// const d2 = results[0];
	// const diff = data.length - d2.length;
	// const emptyArray = [...new Array(diff)].map((d) => '');
	// const d3 = [...emptyArray, ...d2];
	// data = data.map((d, i) => ({ ...d, ema: d3[i] }));
	return results;
};

const obv_inc = async (data1,data2) => {
	// const d1 = data.map((d) => d.close);
	const results = await obv_async([data1,data2],[]);
	// const d2 = results[0];
	// const diff = data.length - d2.length;
	// const emptyArray = [...new Array(diff)].map((d) => '');
	// const d3 = [...emptyArray, ...d2];
	// data = data.map((d, i) => ({ ...d, ema: d3[i] }));
	return results;
};



module.exports = { sma_inc, ema_inc,bbands_inc,wma_inc,  rsi_inc, macd_inc,roc_inc,stoch_inc,obv_inc };