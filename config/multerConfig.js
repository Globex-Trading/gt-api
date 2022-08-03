const multer  = require('multer');
const uuidHelper = require('../utilities/uuidHelper');

const storageDisk = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './tmp-files/uploads');
	},
	filename: (req, file, cb) => {
		cb(null, uuidHelper.generateARandomUUID());
	}
});

// eslint-disable-next-line no-unused-vars
const inMemoryStorageDisk = multer.memoryStorage();

const priceDataStoreUploadMulter = multer({
	storage: storageDisk,
	limits: {
		fields: 2,
		fileSize: 10000000,
		files: 1
	},
	fileFilter: (req, file, cb) => {
		if(file.mimetype === 'text/plain' || file.mimetype === 'text/csv')
			cb(null, true);
		else
			cb(null, false);
	}
}).single('price_data_file');

exports.priceDataStoreUploadMulter = priceDataStoreUploadMulter;