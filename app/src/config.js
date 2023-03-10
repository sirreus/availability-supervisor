const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	PORT: process.env.PORT || 3010,
	CHECK_TIMER: process.env.CHECK_INTERVAL || 450,
	INTEGRITY_CHECK: true,
	MAX_TIMEOUT: process.env.MAX_TIMEOUT * 1000 || 60 * 1000,
	NODES: [
		{
			name: 'Ethereum Goerli',
			type: 'EVM',
			endpoints: [
				{
					url: process.env.ETH_NODE_URL,
					trusted: false,
				},
				{
					url: process.env.ETH_TRUSTED_NODE_URL,
					trusted: true,
				},
			],
			max_blocks_behind: process.env.MAX_BLOCKS_BEHIND || 10,
		},
		{
			name: 'Bitcoin Testnet',
			type: 'NON-EVM',
			endpoints: [
				{
					url: process.env.BTC_NODE_URL,
					trusted: false,
				},
				{
					url: process.env.BTC_TRUSTED_NODE_URL,
					trusted: true,
				},
			],
			max_blocks_behind: process.env.MAX_BLOCKS_BEHIND || 10,
		},
	],
};
