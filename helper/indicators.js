/* eslint-disable */
const tulind = require('tulind');
const { promisify } = require('util');


//Promisify Functions

//SMA
const sma_async = promisify(tulind.indicators.sma.indicator);
//EMA
const ema_async = promisify(tulind.indicators.ema.indicator);

//BBANDS
const bbands_async = promisify(tulind.indicators.bbands.indicator);
//WMA
const wma_async = promisify(tulind.indicators.wma.indicator);

//RSI
const rsi_async = promisify(tulind.indicators.rsi.indicator);
//MACD
const macd_async = promisify(tulind.indicators.macd.indicator);
//ROC
const roc_async = promisify(tulind.indicators.roc.indicator);

//STOCH
//high,low,close
const stoch_async = promisify(tulind.indicators.stoch.indicator);

//OBV
//close,vol
const obv_async = promisify(tulind.indicators.obv.indicator);


//aditional
//md
const md_async = promisify(tulind.indicators.md.indicator);
//wma
const rocr_async = promisify(tulind.indicators.rocr.indicator);
//vwma
//close,volume
const vwma_async = promisify(tulind.indicators.vwma.indicator);


const sma_inc = async (data) => {
	// console.log(tulind.indicators.sma);
	// // const d1 = data.map((d) => d.close);
	// const results = await sma_async([data.close_price], [3]);	
	// return results;
	const d1 = data.map((d) => d.close_price);
	const results = await sma_async([d1], [5]);
	const d2 = results[0];
	const diff = data.length - d2.length;
	const emptyArray = [...new Array(diff)].map((d) => '');
	const d3 = [...emptyArray, ...d2];
	// console.log(data.length);
	data = data.map((d, i) => ( {doc:d, sma: d3[i]} ));
	// console.log(data.length);
	return data;
};

const ema_inc = async (data) => {
	// const d1 = data.map((d) => d.close);
	const d1 = data.map((d) => d.close_price);
	const results = await ema_async([d1], [3]);
	const d2 = results[0];
	const diff = data.length - d2.length;
	const emptyArray = [...new Array(diff)].map((d) => '');
	const d3 = [...emptyArray, ...d2];
	// console.log(data.length);
	data = data.map((d, i) => ( {doc:d, ema: d3[i]} ));
	// console.log(data.length);
	return data;
};

const bbands_inc = async (data) => {
	const d1 = data.map((d) => d.close_price);
	const results = await bbands_async([d1], [5,2]);
	const diff = data.length - results[0].length;
	const emptyArray = [...new Array(diff)].map((d) => '');
  
	const bband1 = [...emptyArray, ...results[0]];
	const bband2 = [...emptyArray, ...results[1]];
	const bband3 = [...emptyArray, ...results[2]];

	data = data.map((d, i) => ({
		doc:d,
		bbands_lower: bband1[i],
		bbands_middle: bband2[i],
		bbands_upper: bband3[i],
	}));
	return data;
};

const wma_inc = async (data) => {
	const d1 = data.map((d) => d.close_price);
	const results = await wma_async([d1], [3]);
	const d2 = results[0];
	const diff = data.length - d2.length;
	const emptyArray = [...new Array(diff)].map((d) => '');
	const d3 = [...emptyArray, ...d2];
	// console.log(data.length);
	data = data.map((d, i) => ( {doc:d, wma: d3[i]} ));
	// console.log(data.length);
	return data;
};


//---------------------------------------

const rsi_inc = async (data) => {
	const d1 = data.map((d) => d.close_price);
	const results = await rsi_async([d1], [3]);
	const d2 = results[0];
	const diff = data.length - d2.length;
	const emptyArray = [...new Array(diff)].map((d) => '');
	const d3 = [...emptyArray, ...d2];
	// console.log(data.length);
	data = data.map((d, i) => ( {doc:d, rsi: d3[i]} ));
	// console.log(data.length);
	return data;
};

//
const macd_inc = async (data) => {
	const d1 = data.map((d) => d.close_price);
	const results = await macd_async([d1], [2, 5, 9]);
	const diff = data.length - results[0].length;
	const emptyArray = [...new Array(diff)].map((d) => '');
  
	const macd1 = [...emptyArray, ...results[0]];
	const macd2 = [...emptyArray, ...results[1]];
	const macd3 = [...emptyArray, ...results[2]];

	data = data.map((d, i) => ({
		doc:d,
		macd_fast: macd1[i],
		macd_slow: macd2[i],
		macd_histogram: macd3[i],
	}));
	return data;
};


const roc_inc = async (data) => {
	const d1 = data.map((d) => d.close_price);
	const results = await roc_async([d1], [3]);
	const d2 = results[0];
	const diff = data.length - d2.length;
	const emptyArray = [...new Array(diff)].map((d) => '');
	const d3 = [...emptyArray, ...d2];
	// console.log(data.length);
	data = data.map((d, i) => ( {doc:d, roc: d3[i]} ));
	// console.log(data.length);
	return data;
};

const stoch_inc = async (data) => {
	// const d1 = data.map((d) => d.close);
	// const results = await stoch_async([data.high_price,data.low_price,data.close_price],[3,2,2]);
	const d1 = data.map((d) => d.high_price);
	const d2 = data.map((d) => d.low_price);
	const d3 = data.map((d) => d.close_price);
	const results = await stoch_async([d1,d2,d3], [3, 2, 2]);
	const diff = data.length - results[0].length;
	const emptyArray = [...new Array(diff)].map((d) => '');
  
	const stoch_k = [...emptyArray, ...results[0]];
	const stoch_d = [...emptyArray, ...results[1]];
	

	data = data.map((d, i) => ({
		doc:d,
		stoch_k: stoch_k[i],
		stoch_d: stoch_d[i],
		
	}));
	return data;
};

const obv_inc = async (data) => {
	// const d1 = data.map((d) => d.close);
	// const results = await obv_async([data.close_price,data.volume],[]);
	const d1 = data.map((d) => d.close_price);
	const v1 = data.map((d) => d.volume);
	const results = await obv_async([d1,v1], []);
	const d2 = results[0];
	const diff = data.length - d2.length;
	const emptyArray = [...new Array(diff)].map((d) => '');
	const d3 = [...emptyArray, ...d2];
	// console.log(data.length);
	data = data.map((d, i) => ( {doc:d, obv: d3[i]} ));
	// console.log(data.length);
	return data;
};


//aditional-----------------
const md_inc = async (data) => {
	// const d1 = data.map((d) => d.close);
	const d1 = data.map((d) => d.close_price);
	const results = await md_async([d1], [3]);
	const d2 = results[0];
	const diff = data.length - d2.length;
	const emptyArray = [...new Array(diff)].map((d) => '');
	const d3 = [...emptyArray, ...d2];
	// console.log(data.length);
	data = data.map((d, i) => ( {doc:d, md: d3[i]} ));
	// console.log(data.length);
	return data;
};

const rocr_inc = async (data) => {
	// const d1 = data.map((d) => d.close);
	const d1 = data.map((d) => d.close_price);
	const results = await rocr_async([d1], [3]);
	const d2 = results[0];
	const diff = data.length - d2.length;
	const emptyArray = [...new Array(diff)].map((d) => '');
	const d3 = [...emptyArray, ...d2];
	// console.log(data.length);
	data = data.map((d, i) => ( {doc:d, rocr: d3[i]} ));
	// console.log(data.length);
	return data;
};

const vwma_inc = async (data) => {
	// const d1 = data.map((d) => d.close);
	const d1 = data.map((d) => d.close_price);
	const v1 = data.map((d) => d.volume);
	const results = await vwma_async([d1,v1], [5]);
	const d2 = results[0];
	const diff = data.length - d2.length;
	const emptyArray = [...new Array(diff)].map((d) => '');
	const d3 = [...emptyArray, ...d2];
	// console.log(data.length);
	data = data.map((d, i) => ( {doc:d, vwma: d3[i]} ));
	// console.log(data.length);
	return data;
};





module.exports = { sma_inc, ema_inc,bbands_inc,wma_inc,  rsi_inc, macd_inc,roc_inc,stoch_inc,obv_inc  ,md_inc,rocr_inc,vwma_inc };