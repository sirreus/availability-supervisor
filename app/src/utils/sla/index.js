const cron = require('node-cron');
const { logSLA } = require('../../winston');
const { NODES } = require('../../config');
const { ethDowntimeCalculator, btcDowntimeCalculator, calculateSLALevel } = require('./calculators');

const SLALevels = {
	EVM: [],
	'NON-EVM': [],
};

const SLAHandlers = {
	EVM: ethDowntimeCalculator,
	'NON-EVM': btcDowntimeCalculator,
};

cron.schedule('0 0 0 * * *', async () => {
	try {
		logSLA('Calculating SLA levels for Ethereum and Bitcoin nodes...');
		for (const { type, endpoints, name } of NODES) {
			const level = await SLAHandlers[type](endpoints, name);

			if (SLALevels[type].length > 0 && SLALevels[type][0].level === level) {
				continue;
			}

			SLALevels[type].push({ level, name });
			logSLA(`Calculation complete. ${name} is at ${calculateSLALevel(level)} SLA level.`);
		}
	} catch (err) {
		logSLA(`Error: ${err}`, err);
	}
});

logSLA('');

module.exports = {
	SLALevels,
};
