
const triggerAlerts = (req,res) => {
	//An array of alert IDs
	const alert_ids = req.body.alert_ids;
	console.log(alert_ids);
	res.json(alert_ids);
};

exports.triggerAlerts = triggerAlerts;