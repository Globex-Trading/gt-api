const {app, httpsApp } = require('./app');
const port = process.env.NODE_PORT || 3000;
const httpsPort = process.env.NODE_HTTPS_PORT || 3001;

let appServer;

if (process.env.NODE_ENV === 'test') {
	appServer = app.listen(0, () => { });
} else if (process.env.NODE_ENV === 'production'){
	appServer = httpsApp.listen(httpsPort, () => {
		console.log(`Running on https://localhost:${httpsPort}`);
	});
} else {
	appServer = app.listen(port, () => {
		console.log(`Running on http://localhost:${port}`);
	});
}

module.exports = appServer;