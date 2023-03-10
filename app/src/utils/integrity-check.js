const { logIntegrity } = require('../winston');
const { fetchRPC } = require('./fetch-rpc');
const { cache } = require('../cache.js');

const check = (response, expected) => response === expected;

const performIntegrityCheck = async (node) => {
	if (cache[node.type].length === 0) return;
	try {
		let integrityVerified;
		const trustedURL = node.endpoints.find((endpoint) => endpoint.trusted).url;

		if (!trustedURL) {
			logIntegrity(`No trusted node found for ${node.name}`, true);
			return;
		}

		for (let { requestData, response } of cache[node.type]) {
			let newResponse = await fetchRPC(trustedURL, requestData);
			integrityVerified = check(
				node.type === 'EVM' ? newResponse : newResponse?.initialblockdownload,
				response,
				node.name,
				integrityVerified
			);
		}

		if (!integrityVerified) {
			logIntegrity(`Integrity check failed for ${node.name}`, true);
		} else {
			logIntegrity(`Integrity check passed for ${node.name}`);
		}
	} catch (err) {
		logIntegrity(err, err);
	}
};

module.exports = {
	performIntegrityCheck,
};
