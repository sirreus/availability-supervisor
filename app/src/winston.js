const chalk = require('chalk');
const winston = require('winston');

const logger = (integrity) => {
	return winston.createLogger({
		transports: [
			new winston.transports.File({ filename: `logs/${integrity ? 'integrity' : 'availability'}-checks.log` }),
		],
	});
};

const logMessage = (message, error) => {
	console[error ? 'error' : 'log'](chalk[error ? 'red' : 'blue'](message));
	logger().log({
		level: error ? 'error' : 'info',
		message: `${new Date().toISOString()} - ${message} ${__filename}}`,
	});
};

const logIntegrity = (message, error) => {
	console[error ? 'error' : 'log'](chalk[error ? 'yellowBright' : 'green'](message));
	logger(true).log({
		level: error ? 'error' : 'info',
		message,
	});
};

const logSLA = (message, error) => {
	console[error ? 'error' : 'log'](chalk[error ? 'bgRed' : 'bgCyan'](message));
	logger().log({
		level: error ? 'error' : 'info',
		message,
	});
};

module.exports = { logger, logMessage, logIntegrity, logSLA };
