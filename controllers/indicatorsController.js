/* eslint-disable */
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
  
const { User } = require('../models/user');
const { getCandleModelForCollection } = require('../models/candleStick');
const asyncHandler = require('express-async-handler');



const getTAData =asyncHandler( async (req,res) => {
	
	//get recent 10 cs data
	const dbdata= await getCandleModelForCollection('binance_BNBUSDT_15m').find().sort({ _id: -1 }).limit(10);

	//re-format data for TA
	var dataobj=structuredData(dbdata);
	console.log(dataobj);

	//get calculated data
	const ema = await ema_inc(dataobj.close_price);


	res.status(200).json(ema);
	
});



function structuredData(datalist){
	var dataobj={
		_id:[],
		open_time: [],
		close_time: [],
		open_price: [],
		close_price: [],
		high_price: [],
		low_price: [],
		volume: [],
		ta:[]
	};
	datalist.forEach(element => {
		dataobj.open_time.push(element.open_time);
		dataobj.close_time.push(element.close_time);
		dataobj._id.push(element._id);
		dataobj.open_price.push(element.open_price);
		dataobj.close_price.push(element.close_price);
		dataobj.high_price.push(element.high_price);
		dataobj.low_price.push(element.low_price);
		dataobj.volume.push(element.volume);
		
	});

	return dataobj;
}


module.exports = {
	getTAData
	
};