const fetch = require('node-fetch');
const { logMessage } = require('../winston');
const { MAX_TIMEOUT } = require('../config');

const fetchRPC = async (url, body) => {
	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(body),
			timeout: MAX_TIMEOUT,
		});
		const json = await res.json();
		return json.result;
	} catch (err) {
		logMessage(err, err);
	}
};

module.exports = {
	fetchRPC,
};
