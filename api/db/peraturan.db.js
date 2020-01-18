const pool = require('./dbconnection');
const rx = require('rxjs');
const helper = require('../helper');
const PeraturanDB = {};

PeraturanDB.get = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			peraturan `,
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

PeraturanDB.getById = async (Id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			peraturan where idperaturan=?`,
			[ Id ],
			(err, result) => {
				if (err) return reject(err);
				resolve(result[0]);
			}
		);
	});
};

PeraturanDB.post = async (params) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query('insert into peraturan (tahun) values(?)', [ params.tahun ], (err, result) => {
				if (err) throw Error();

				params.idperaturan = result.insertId;
				resolve(params);
			});
		} catch (error) {
			reject(error);
		}
	});
};

PeraturanDB.put = async (data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'update peraturan set tahun=? where idperaturan=? ',
				[ data.tahun, data.idperaturan ],
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

PeraturanDB.delete = (id) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query('delete from peraturan where idperaturan=? ', [ id ], (err, result) => {
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

module.exports = PeraturanDB;
