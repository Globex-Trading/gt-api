
var admin = require('firebase-admin');

//get the json file from  project settings->service account->generate new private key
var serviceAccount = require('path/to/serviceAccountKey.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});


/* eslint-disable no-unused-vars */
const sendAlerts = (configToken,msg) => {
	console.log(configToken,msg);

	var payload = {
		notification: {
			title: 'Test',
			body: msg
		}
	};
    
	admin.messaging().sendToDevice(configToken, payload)
		.then(function(response) {
			console.log('Successfully sent message:', response);
		})
		.catch(function(error) {
			console.log('Error sending message:', error);
		});
    
};

module.exports = { sendAlerts };