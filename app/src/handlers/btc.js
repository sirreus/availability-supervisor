const { logMessage } = require('../winston');
const { fetchRPC } = require('../utils/fetch-rpc');
const { cacheRequest } = require('../cache');

const request = (method, params) => {
	return { jsonrpc: '2.0', method, params, id: 1 };
};

const getBlockchainInfo = request('getblockchaininfo');

const getBTCLatestBlock = async (url) => {
	try {
		const blockResponse = await fetchRPC(url, getBlockchainInfo);
		const currentHeight = await blockResponse?.blocks;
		return parseInt(currentHeight, 16);
	} catch (err) {
		logMessage(`Error getting latest block: ${err}`, err);
	}
};

const checkBTCNodeSync = async (url, nodeName, integrityCheck) => {
	try {
		const response = await fetchRPC(url, getBlockchainInfo);

		if (integrityCheck) cacheRequest(getBlockchainInfo, response.initialblockdownload);

		if (!response?.initialblockdownload) {
			logMessage(`Node ${nodeName} is fully synchronized`);
			return true;
		} else {
			logMessage(`Node ${nodeName} is not-fully synchronized`, true);
			return false;
		}
	} catch (err) {
		logMessage(`Node ${nodeName} is  not-fully synchronized, there was an error: ${err}`, err);
		return false;
	}
};

const checkBTCAvailability = async (node, integrityCheck) => {
	let nodeUrl;
	let trustedUrl;
	const { name, endpoints, max_blocks_behind } = node;
	await fetchRPC(endpoints[0].url, null);
	logMessage(`Susseccfully connected to ${name} node`);

	for (const { trusted, url } of endpoints) {
		if (trusted) {
			trustedUrl = url;
		} else {
			nodeUrl = url;
		}
	}

	const lastBlockHeight = await getBTCLatestBlock(nodeUrl);
	const latestBlockHeight = await getBTCLatestBlock(trustedUrl);
	const blocksBehind = lastBlockHeight - latestBlockHeight;

	if (blocksBehind > max_blocks_behind) {
		logMessage(`Node ${name} is too far behind (behind by ${blocksBehind} blocks)`, true);
	}

	const isSync = await checkBTCNodeSync(nodeUrl, name, integrityCheck);

	return isSync;
};

module.exports = {
	checkBTCAvailability,
};
