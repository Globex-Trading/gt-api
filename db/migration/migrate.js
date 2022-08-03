const createCollectionsMigrate = require('./createCollections');
const createPriceDataCollections = require('./createPriceDataCollections');

const runInitialCollectionsMigration = async () => {
	await createCollectionsMigrate.up();
};

const runPriceDataCollectionMigration = async () => {
	await createPriceDataCollections.up();
};

exports.runInitialCollectionsMigration = runInitialCollectionsMigration;
exports.runPriceDataCollectionMigration = runPriceDataCollectionMigration;