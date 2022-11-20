const {getAllProvidersWithSymbols} = require('../../services/providerService');
const {getCandleModelForCollection} = require('../../models/candleStick');

const up = async () => {
	const providers = await getAllProvidersWithSymbols();
	for (const provider of providers) {
		for (const symbol of provider.symbols) {
			for (const timeInterval of provider.providedTimeFrames) {
				const collectionName = `${provider.slug}_${symbol.providedName}_${timeInterval}`;
				const Candle = getCandleModelForCollection(collectionName);
				await createCollectionWithIndexes(Candle, collectionName);
			}
		}
	}
};

const createCollectionWithIndexes = async (Candle, collectionName) => {
	await Candle.createCollection();
	await Candle.createIndexes();
	console.log(collectionName + ' collection was created successfully.');
};

exports.up = up;