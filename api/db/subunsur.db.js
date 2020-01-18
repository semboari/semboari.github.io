const pool = require('./dbconnection');
const rx = require('rxjs');
const helper = require('../helper');
const subunsurDB = {};

subunsurDB.get = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			subunsur `,
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

subunsurDB.getById = async (Id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			subunsur where idsubunsur=?`,
			[ Id ],
			(err, result) => {
				if (err) return reject(err);
				resolve(result[0]);
			}
		);
	});
};

subunsurDB.post = async (params) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				`insert into subunsur (idunsur, jenisunsur, namaSubUnsur, satuanhasil,ak,
                     skspersemester, pelaksanaankegiatan,idtahunaturan, idjabatan) 
                values(?,?,?,?,?,?,?,?,?)`,
				[
					params.idunsur,
					params.jenisunsur,
					params.namaSubUnsur,
					params.satuanhasil,
					params.ak,
					params.skspersemester,
					params.pelaksanaankegiatan,
					params.idtahunaturan,
					params.idjabatan
				],
				(err, result) => {
					if (err) throw Error();

					params.idsubunsur = result.insertId;
					resolve(params);
				}
			);
		} catch (error) {
			reject(error);
		}
	});
};

subunsurDB.put = async (params) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				`update subunsur set idunsur=?, jenisunsur=?, namaSubUnsur=?, satuanhasil=?,ak=?,
                    skspersemester=?, pelaksanaankegiatan=?,idtahunaturan=?, idjabatan where idsubunsur=? where idsubunsur=?`,
				[
					params.idunsur,
					params.jenisunsur,
					params.namaSubUnsur,
					params.satuanhasil,
					params.ak,
					params.skspersemester,
					params.pelaksanaankegiatan,
					params.idtahunaturan,
					params.idjabatan,
					params.idsubunsur
				],
				(err, result) => {
					if (err) {
						reject(err);
					}

					resolve(params);
				}
			);
		} catch (error) {
			reject(error);
		}
	});
};

subunsurDB.delete = (id) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query('delete from subunsur where idsubunsur=? ', [ id ], (err, result) => {
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

module.exports = subunsurDB;
