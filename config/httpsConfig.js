const fs = require('fs');
const https = require('https');

const configureHTTPS = (app) => {
	if (process.env.NODE_ENV !== 'production') {
		return null;
	}

	const certificateLoc = process.env.CERT_CERTIFICATE_LOCATION || '/certs/fullchain.pem';
	const privateKeyLoc = process.env.CERT_PRIVATE_KEY_LOCATION || '/certs/privkey.pem';

	const privateKey  = fs.readFileSync(privateKeyLoc, 'utf8');
	const certificate = fs.readFileSync(certificateLoc, 'utf8');

	return https.createServer({
		key: privateKey,
		cert: certificate
	}, app);
};

exports.configureHTTPS = configureHTTPS;