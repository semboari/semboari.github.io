const pool = require('./dbconnection');
const rx = require('rxjs');
const helper = require('../helper');
const UniversitasDb = {};

UniversitasDb.get = async () => {
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

UniversitasDb.getById = async (id) => {
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

UniversitasDb.getByParentId = async (id) => {
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

UniversitasDb.post = async (params) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'insert into fakultas (iduniversitas,namafakultas) values(?,?)',
				[ params.iduniversitas, params.namafakultas ],
				(err, result) => {
					if (err) throw Error();

					params.idfakultas = result.insertId;
					resolve(params);
				}
			);
		} catch (error) {
			reject(error);
		}
	});
};

UniversitasDb.put = async (data) => {
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

UniversitasDb.delete = (id) => {
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

module.exports = UniversitasDb;
