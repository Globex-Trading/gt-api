
var admin = require('firebase-admin');

//get the json file from  project settings->service account->generate new private key

// TODO: Fix Later. Commented due to not having a serviceAccount
var serviceAccount = require('../notification-config.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});


/* eslint-disable no-unused-vars */
const sendAlerts = (configToken, title, msg) => {
	console.log(configToken, msg);

	var payload = {
		notification: {
			title: title,
			body: msg
		}
	};

	admin.messaging().sendToDevice(configToken, payload)
		.then(function (response) {
			console.log('Successfully sent message:', response);
			return response;
		})
		.catch(function (error) {
			console.log('Error sending message:', error);
			return error;
		});

};

module.exports = { sendAlerts };