/* eslint-disable no-mixed-spaces-and-tabs */
const {
	sma_inc,
	ema_inc,
	bbands_inc,
	wma_inc,

	rsi_inc,
	macd_inc,
	roc_inc,
	stoch_inc,
	obv_inc 
} = require('../helper/indicators');
  
const { Alert } = require('../models/alert');
const { User } = require('../models/user');
const asyncHandler = require('express-async-handler');



//Examples assume you have some price data like this:
//Data order is from oldest to newset (index 0 is the oldest)
var open  = [4,5,5,5,4,4,4,6,6,6];
var high  = [9,7,8,7,8,8,7,7,8,7];
var low   = [1,2,3,3,2,1,2,2,2,3];
var close = [4,5,6,6,6,5,5,5,6,4];
var volume = [123,232,212,232,111,232,212,321,232,321];

const getTAData =asyncHandler( async (req,res) => {
	const klinedata = await obv_inc(close,volume);
	// const bbannd= await bbands_inc(close);
	// const wma = await wma_inc(close);
	// klinedata = await ema_inc(klinedata);
	// klinedata = markers_inc(klinedata);
	// klinedata = await rsi_inc(klinedata);
	// klinedata = await macd_inc(klinedata);
	await console.log(klinedata)
	res.status(200).json(klinedata);
	
});



module.exports = {
	getTAData
	
};