const pool = require('./dbconnection');
const rx = require('rxjs');
const helper = require('../helper');
const JabatanFuntionalDB = {};

JabatanFuntionalDB.get = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			jabatanfungsional`,
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

JabatanFuntionalDB.getById = async (Id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			jabatanfungsional where idjabatan=? `,
			[ Id ],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

JabatanFuntionalDB.post = async (data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'insert into jabatanfungsional  (jabatan, ak, pangkat, golongan, ruang) values(?,?,?,?,?)',
				[ data.jabatan, data.ak, data.pangkat, data.golongan, data.ruang ],
				(err, result) => {
					if (err) throw Error();

					data.idjabatan = result.insertId;
					resolve(data);
				}
			);
		} catch (error) {
			reject(error);
		}
	});
};

JabatanFuntionalDB.put = async (data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'update jabatanfungsional set jabatan=?, ak=?, pangkat=?, golongan=?, ruang=? where idjabatan=? ',
				[ data.jabatan, data.ak, data.pangkat, data.golongan, data.ruang, data.idjabatan ],
				(err, result) => {
					if (err) {
						reject(err);
					}

					resolve(data);
				}
			);
		} catch (error) {
			reject(error);
		}
	});
};

JabatanFuntionalDB.delete = (id) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query('delete from jabatanfungsional where idjabatan=? ', [ id ], (err, result) => {
				if (err) {
					reject(err);
				}

				resolve(true);
			});
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = JabatanFuntionalDB;
