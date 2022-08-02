const { v4: uuidv4 } = require('uuid');

const generateARandomUUID = () => {
	return uuidv4();
};

exports.generateARandomUUID = generateARandomUUID;