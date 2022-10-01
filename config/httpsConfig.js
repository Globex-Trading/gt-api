const fs = require('fs');
const https = require('https');

const configureHTTPS = (app) => {
	const privateKey  = fs.readFileSync('./resources/certs/privkey.pem', 'utf8');
	const certificate = fs.readFileSync('./resources/certs/fullchain.pem', 'utf8');
	return https.createServer({
		key: privateKey,
		cert: certificate
	}, app);
};

exports.configureHTTPS = configureHTTPS;