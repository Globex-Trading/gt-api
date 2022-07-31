const FCM = require('fcm-node');
const serverKey = process.env.FCM_API_TOKEN;
const fcm = new FCM(serverKey);

/* eslint-disable no-unused-vars */
const sendAlerts = (configToken,msg) => {
	console.log(configToken,msg);

	var message = {
		to: configToken,
		notification: {
			title: 'NotifcatioTestAPP',
			body: msg,
		}
     
	};
    
	fcm.send(message, function (err, response) {
		if (err) {
			console.log('Something has gone wrong!' + err.toString());
			console.log('Respponse:! ' + response);
		} else {
			// showToast("Successfully sent with response");
			console.log('Successfully sent with response: ', response);
		}
    
	});
    
};

module.exports = { sendAlerts };