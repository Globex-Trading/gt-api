const {Indicator} = require('../../models/indicator');

const seed = async () => {
	const indicators = [
		{
			name: 'sma',
			newPane: false,
			chartType: 'line'
		},
		{
			name: 'ema',
			newPane: false,
			chartType: 'line'
		},
		{
			name: 'bbands',
			newPane: false,
			chartType: 'line'
		},
		{
			name: 'wma',
			newPane: false,
			chartType: 'line'
		},
		{
			name: 'rsi',
			newPane: true,
			chartType: 'line'
		},
		{
			name: 'macd',
			newPane: true,
			chartType: 'line'
		},
		{
			name: 'roc',
			newPane: true,
			chartType: 'line'
		},
		{
			name: 'stoch',
			newPane: true,
			chartType: 'line'
		},
		{
			name: 'obv',
			newPane: true,
			chartType: 'line'
		}
	];

	try {
		await Indicator.insertMany(indicators);
	} catch (err) {
		console.log(err);
	}
};

exports.seed =seed;



