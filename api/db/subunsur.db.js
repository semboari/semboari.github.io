const pool = require('./dbconnection');
const rx = require('rxjs');
const helper = require('../helper');
const subunsurDB = {};

subunsurDB.get = async (Id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
			subunsur.idsubunsur,
			subunsur.idunsur,
			subunsur.namasubunsur,
			subunsur.satuanhasil,
			subunsur.ak,
			subunsur.skspersmt,
			subunsur.idtahunaturan,
			subunsur.idjabatan,
			unsur.nama as namaunsur,
			peraturan.tahun,
			jabatanfungsional.jabatan as namajabatan
		  FROM
			subunsur
			LEFT JOIN unsur ON subunsur.idunsur = unsur.idunsur
			LEFT JOIN peraturan ON subunsur.idtahunaturan =
		  peraturan.idperaturan
			LEFT JOIN jabatanfungsional ON subunsur.idjabatan =
		  jabatanfungsional.idjabatan where idtahunaturan=? `,
			[ Id ],
			(err, result) => {
				if (err) reject(err);
				resolve(result);
			}
		);
	});
};

subunsurDB.getById = async (Id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
			subunsur.idsubunsur,
			subunsur.idunsur,
			subunsur.namasubunsur,
			subunsur.satuanhasil,
			subunsur.ak,
			subunsur.skspersmt,
			subunsur.idtahunaturan,
			subunsur.idjabatan,
			unsur.nama as namaunsur,
			peraturan.tahun,
			jabatanfungsional.jabatan as namajabatan
		  FROM
			subunsur
			LEFT JOIN unsur ON subunsur.idunsur = unsur.idunsur
			LEFT JOIN peraturan ON subunsur.idtahunaturan =
		  peraturan.idperaturan
			LEFT JOIN jabatanfungsional ON subunsur.idjabatan =
		  jabatanfungsional.idjabatan where idsubunsur=?`,
			[ Id ],
			(err, result) => {
				if (err) reject(err);
				else resolve(result[0]);
			}
		);
	});
};

subunsurDB.post = async (params) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				`insert into subunsur (idunsur, namasubunsur, satuanhasil,ak,
					skspersmt, idtahunaturan, idjabatan) 
                values(?,?,?,?,?,?,?)`,
				[
					params.idunsur,
					params.namasubunsur,
					params.satuanhasil,
					params.ak,
					params.skspersmt,
					params.idtahunaturan,
					params.idjabatan
				],
				(err, result) => {
					if (err) reject(err);
					else {
						params.idsubunsur = result.insertId;
						resolve(params);
					}
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
				`update subunsur set idunsur=?,  namasubunsur=?, satuanhasil=?,ak=?,
					skspersmt=?, idtahunaturan=?, idjabatan=? where idsubunsur=?`,
				[
					params.idunsur,
					params.namasubunsur,
					params.satuanhasil,
					params.ak,
					params.skspersmt,
					params.idtahunaturan,
					params.idjabatan,
					params.idsubunsur
				],
				(err, result) => {
					if (err) {
						reject(err);
					} else resolve(params);
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
				} else resolve(true);
			});
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = subunsurDB;
