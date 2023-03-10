const { cacheRequest } = require('../cache');
const { logMessage } = require('../winston');
const { fetchRPC } = require('../utils/fetch-rpc');

const request = (method, params) => {
	return { jsonrpc: '2.0', method, params, id: 1 };
};

const getLatestBlock = async (url) => {
	try {
		const response = await fetchRPC(url, request('eth_blockNumber'));
		return parseInt(response, 16);
	} catch (err) {
		logMessage(`Error getting latest block: ${err}`, err);
	}
};

const checkNodeSync = async (url, nodeName, integrityCheck) => {
	try {
		const response = await fetchRPC(url, request('eth_syncing'));

		if (integrityCheck) cacheRequest(request('eth_syncing'), response, 'EVM');

		if (response) {
			logMessage(`Node ${nodeName} is not fully synchronized`, true);
			return false;
		} else {
			logMessage(`Node ${nodeName} is fully synchronized`);
			return true;
		}
	} catch (err) {
		logMessage(`Node ${nodeName} is not fully synchronized with an error: ${err}`, err);
	}
};

const checkEVMAvailability = async (node, integrityCheck) => {
	let nodeUrl;
	let trustedUrl;
	const { name, endpoints, max_blocks_behind } = node;
	const listening = await fetchRPC(endpoints[0].url, request('net_listening'));
	logMessage(listening ? `Susseccfully connected to ${name} node` : `Failed to connect to ${name} node`, !listening);

	for (const { trusted, url } of endpoints) {
		if (trusted) {
			trustedUrl = url;
		} else {
			nodeUrl = url;
		}
	}

	const lastBlockHeight = await getLatestBlock(nodeUrl);
	const latestBlockHeight = await getLatestBlock(trustedUrl);
	const blocksBehind = lastBlockHeight - latestBlockHeight;

	if (blocksBehind > max_blocks_behind) {
		logMessage(`Node ${name} is too far behind (behind by ${blocksBehind} blocks)`, true);
	}

	const isSync = await checkNodeSync(trustedUrl, name, integrityCheck);
	return isSync;
};

module.exports = {
	getLatestBlock,
	checkNodeSync,
	checkEVMAvailability,
};
