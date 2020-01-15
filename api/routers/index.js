module.exports = function(app) {
	const bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use('/api/auth', require('../auth'));
	app.use('/api/universitas', require('./universitas.route'));
	app.use('/api/unsur', require('./unsur.route'));
};
