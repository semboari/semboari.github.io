const pool = require('./dbconnection');
const fakultasDb = {};

fakultasDb.post = (iduniversitas, data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'insert into fakultas (iduniversitas,namafakultas) values(?,?)',
				[ iduniversitas, data.namauniversitas ],
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

fakultasDb.put = (id, data) => {
	return new Promise((resolve, reject) => {
		pool.query('update fakultas set ', [], (err, result) => {});
	});
};

fakultasDb.delete = (id) => {
	return new Promise((resolve, reject) => {
		pool.query('delete from fakultas where idfakultas=?', [ id ], (err, result) => {});
	});
};

module.exports = fakultasDb;
