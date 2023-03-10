const cache = {
	EVM: [],
	'NON-EVM': [],
};

const cacheRequest = (requestData, response, type) =>
	cache[type === 'EVM' ? 'EVM' : 'NON-EVM'].push({ requestData, response });

module.exports = {
	cacheRequest,
	cache,
};
