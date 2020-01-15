const pool = require('./dbconnection');
const rx = require('rxjs');
const helper = require('../helper');
const programStudiDb = {};

programStudiDb.post = (idfakultas, data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'insert into programstudi (idfakultas,namaprogramstudi) values(?,?)',
				[ idfakultas, data.namaprogramstudi ],
				(err, result) => {
					if (err) throw Error();
					resolve(result.insertId);
				}
			);
		} catch (err) {
			reject(err);
		}
	});
};

programStudiDb.put = (id, data) => {
	return new Promise((resolve, reject) => {
		pool.query('update programstudi set ', [], (err, result) => {});
	});
};

programStudiDb.delete = (id) => {
	return new Promise((resolve, reject) => {
		pool.query('delete from programstudi where idprogramstudi=?', [ id ], (err, result) => {});
	});
};

module.exports = programStudiDb;
