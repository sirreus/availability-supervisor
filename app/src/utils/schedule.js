const { checkAvailability } = require('./check-availability');
const { performIntegrityCheck } = require('./integrity-check');
const { NODES, CHECK_TIMER } = require('../config');
const { logMessage } = require('../winston');
const config = require('../config');

let intervalID;
const toCheckIntegrity = config.INTEGRITY_CHECK;

const scheduleAvailabilityCheck = () => {
	try {
		const randomInterval = Math.floor(Math.random() * (CHECK_TIMER - 1 + 1) + 1);
		logMessage(`Scheduling availability check in ${randomInterval} seconds`);

		intervalID = setInterval(async () => {
			for (const node of NODES) {
				const random = Math.random();
				const availability = await checkAvailability(node, random > 0.5 && toCheckIntegrity);
				if (random > 0.5 && toCheckIntegrity) await performIntegrityCheck(node);
				logMessage(`Node ${node.name} is ${availability ? 'available' : 'not available'}`);
			}

			clearInterval(intervalID);
			scheduleAvailabilityCheck();
		}, randomInterval * 1000);
	} catch (err) {
		logMessage(err, err);
	}
};

scheduleAvailabilityCheck();
