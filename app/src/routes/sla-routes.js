const router = require('express').Router();
const { NODES } = require('../config');
const { SLALevels } = require('../utils/sla');
const { calculateSLALevel } = require('../utils/sla/calculators');

router.get('/', (_, res) => {
	if (SLALevels['EVM'].length === 0 || SLALevels['NON-EVM'].length === 0) {
		const html = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh">
			<p style="font-size:44px">SLA levels are not yet calculated. Please try again later. 📊</p>
			</div>`;
		res.send(html);
	} else {
		const nodes = NODES.map(({ name, type }) => {
			const level = SLALevels[type].find((node) => node.name === name).level;
			return `<div style="display:flex;align-items:center;justify-content:center;grid-gap: 14px;font-size: 34px;"><img style="max-width: 44px; width: 100%;" src="/assets/nodes.png" alt="nodes" /><p>${name} is at <span style="color: #4E9FBA;">${calculateSLALevel(
				level
			)}</span> SLA level.</p></div>`;
		});
		const wrapper = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">${nodes.join(
			''
		)}</div>`;
		res.send(wrapper);
	}
});

module.exports = router;
