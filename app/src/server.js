const router = require('express').Router();
const { PORT } = require('./config');
const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const app = express();
require('./utils/schedule');

// Cors config
const whitelist = ['http://localhost:3000'];
const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: 'GET, POST, PUT, DELETE, OPTIONS',
	credentials: true,
};

// Cors and body parser
app.use(cors(corsOptions));
app.use(express.json());

// Static files
app.use(express.static('public'));
app.use('/assets', express.static('assets'));

// Health check
app.use(
	'/api',
	router.get('/health', (_, res) => res.status(200).send('OK'))
);

// Render SLA levels in HTML
app.use('/', require('./routes/sla-routes'));

app.listen(PORT, () => {
	console.log(chalk.cyan(`Express server listening on port ${PORT}`));
});
