const pool = require('./dbconnection');
const rx = require('rxjs');
const helper = require('../helper');
const FakultasDb = {};

FakultasDb.get = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			fakultas `,
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

FakultasDb.getById = async (id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			fakultas where idfakultas=?`,
			[ id ],
			(err, result) => {
				if (err) return reject(err);
				resolve(result[0]);
			}
		);
	});
};

FakultasDb.getByParentId = async (id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			fakultas where iduniversitas=?`,
			[ id ],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

FakultasDb.post = async (params) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'insert into fakultas (iduniversitas,namafakultas) values(?,?)',
				[ params.iduniversitas, params.namafakultas ],
				(err, result) => {
					if (err) reject(err);

					params.idfakultas = result.insertId;
					resolve(params);
				}
			);
		} catch (error) {
			reject(error);
		}
	});
};

FakultasDb.put = async (data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'update fakultas set namafakultas=? where idfakultas=? ',
				[ data.namafakultas, data.idfakultas ],
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

FakultasDb.delete = (id) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query('delete from fakultas where idfakultas=? ', [ id ], (err, result) => {
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

module.exports = FakultasDb;
