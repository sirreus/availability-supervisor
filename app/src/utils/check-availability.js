const { logMessage } = require('../winston');
const { checkEVMAvailability } = require('../handlers/evm');
const { checkBTCAvailability } = require('../handlers/btc');

const EVM = 'EVM',
	NON_EVM = 'NON-EVM';

const handlers = {
	[EVM]: checkEVMAvailability,
	[NON_EVM]: checkBTCAvailability,
};

const checkAvailability = async (node, integrityCheck) => {
	try {
		return await handlers[node.type](node, integrityCheck);
	} catch (error) {
		logMessage(error, error);
		return false;
	}
};

module.exports = {
	checkAvailability,
};
