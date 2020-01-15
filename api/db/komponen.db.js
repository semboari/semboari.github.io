const pool = require('./dbconnection');
const komponenDb = {};

komponenDb.post = (idkomponen, data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'insert into komponen (idkomponen,namafakultas) values(?,?)',
				[ idkomponen, data.namauniversitas ],
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

komponenDb.put = (id, data) => {
	return new Promise((resolve, reject) => {
		pool.query('update komponen set ', [], (err, result) => {});
	});
};

komponenDb.delete = (id) => {
	return new Promise((resolve, reject) => {
		pool.query('delete from komponen where idkomponen=?', [ id ], (err, result) => {});
	});
};

module.exports = komponenDb;
