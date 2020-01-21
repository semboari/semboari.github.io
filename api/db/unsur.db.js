const pool = require('./dbconnection');
const rx = require('rxjs');
const helper = require('../helper');
const UnsurDB = {};

UnsurDB.get = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			unsur `,
			(err, result) => {
				if (err) reject(err);
				resolve(result);
			}
		);
	});
};

UnsurDB.getById = async (Id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			unsur where idunsur=?`,
			[ Id ],
			(err, result) => {
				if (err) reject(err);
				resolve(result[0]);
			}
		);
	});
};

UnsurDB.post = async (params) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query('insert into unsur (nama) values(?)', [ params.nama ], (err, result) => {
				if (err) reject(err);

				params.idunsur = result.insertId;
				resolve(params);
			});
		} catch (error) {
			reject(error);
		}
	});
};

UnsurDB.put = async (data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query('update unsur set nama=? where idunsur=? ', [ data.nama, data.idunsur ], (err, result) => {
				if (err) {
					reject(err);
				}

				resolve(data);
			});
		} catch (error) {
			reject(error);
		}
	});
};

UnsurDB.delete = (id) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query('delete from unsur where idunsur=? ', [ id ], (err, result) => {
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

module.exports = UnsurDB;
