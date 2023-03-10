const { fetchRPC } = require('../fetch-rpc');
const { logSLA } = require('../../winston');

const ethDowntimeCalculator = async (endpoints, name) => {
	try {
		for (const { url } of endpoints) {
			const blockNumber = await fetchRPC(url, {
				jsonrpc: '2.0',
				id: 1,
				method: 'eth_blockNumber',
				params: [],
			});
			const getSingleBlock = await fetchRPC(url, {
				jsonrpc: '2.0',
				id: 1,
				method: 'eth_getBlockByNumber',
				params: [blockNumber, true],
			});
			const currentTimestamp = Math.floor(new Date().getTime() / 1000);
			const blockTimestamp = parseInt(getSingleBlock?.timestamp, 16);
			const blockTimeDifference = currentTimestamp - blockTimestamp;
			logSLA(`Block time difference for ${name} is ${blockTimeDifference} seconds.`);
			return blockTimeDifference;
		}
	} catch (err) {
		logSLA(`Error: ${err}`, err);
	}
};

const btcDowntimeCalculator = async (endpoints, name) => {
	try {
		for (const { url } of endpoints) {
			const blockchainInfo = await fetchRPC(url, {
				jsonrpc: '2.0',
				id: 1,
				method: 'getblockchaininfo',
				params: [],
			});
			const currentTimestamp = Math.floor(new Date().getTime() / 1000);
			const blockTimestamp = blockchainInfo?.mediantime;
			const blockTimeDifference = currentTimestamp - blockTimestamp;
			logSLA(`Block time difference for ${name} is ${blockTimeDifference} seconds.`);
			return blockTimeDifference;
		}
	} catch (err) {
		logSLA(`Error: ${err}`, err);
	}
};

const calculateSLALevel = (downtime) => {
	if (downtime <= 900) {
		return '99%';
	} else if (downtime <= 3600) {
		return '96%';
	} else if (downtime <= 10800) {
		return '88%';
	} else if (downtime <= 21600) {
		return '75%';
	} else {
		return '50%';
	}
};

module.exports = {
	calculateSLALevel,
	ethDowntimeCalculator,
	btcDowntimeCalculator,
};
