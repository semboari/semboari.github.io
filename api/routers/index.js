module.exports = function(app) {
	const bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use('/api/auth', require('../auth'));
	app.use('/api/universitas', require('./universitas.route'));
	app.use('/api/fakultas', require('./fakultas.route'));
	app.use('/api/programstudi', require('./programstudi.route'));
	app.use('/api/unsur', require('./unsur.route'));
	app.use('/api/subunsur', require('./subunsur.router'));
	app.use('/api/jabatanfungsional', require('./jabatanfungsional.router'));
	app.use('/api/peraturan', require('./peraturan.router'));
	app.use('/api/dosen', require('./dosen.router'));
	app.use('/api/penilaian', require('./penilaian.router'));
	app.use('/api/administrator', require('./administrator.router'));
};
