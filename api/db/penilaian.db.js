const pool = require('./dbconnection');
const rx = require('rxjs');
const helper = require('../helper');
const PenilaianDB = {};

PenilaianDB.get = async (id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
			penilaian.keterangan,
			penilaian.jumlahkegiatan,
			penilaian.satuanhasil,
			penilaian.uraiankegiatan,
			penilaian.iddosen,
			penilaian.idsubunsur,
			penilaian.idpenilaian,
			penilaian.tanggal,
			subunsur.namasubunsur,
			subunsur.jenisunsur,
			unsur.nama AS namaunsur,
			peraturan.tahun,
			subunsur.ak * penilaian.jumlahkegiatan as akview,
			subunsur.satuanhasil AS satuanhasil1
		  FROM
			penilaian
			LEFT JOIN subunsur ON penilaian.idsubunsur = subunsur.idsubunsur
			LEFT JOIN unsur ON subunsur.idunsur = unsur.idunsur
			LEFT JOIN peraturan ON subunsur.idtahunaturan =
		  peraturan.idperaturan where iddosen=? `,
			[ id ],
			(err, result) => {
				if (err) reject(err);
				else resolve(result);
			}
		);
	});
};

PenilaianDB.getById = async (Id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
			penilaian.keterangan,
			penilaian.jumlahkegiatan,
			penilaian.satuanhasil,
			penilaian.uraiankegiatan,
			penilaian.iddosen,
			penilaian.idsubunsur,
			penilaian.idpenilaian,
			penilaian.tanggal,
			subunsur.namasubunsur,
			subunsur.jenisunsur,
			unsur.nama AS namaunsur,
			peraturan.tahun,
			subunsur.ak * penilaian.jumlahkegiatan as akview,
			subunsur.satuanhasil AS satuanhasil1
		  FROM
			penilaian
			LEFT JOIN subunsur ON penilaian.idsubunsur = subunsur.idsubunsur
			LEFT JOIN unsur ON subunsur.idunsur = unsur.idunsur
			LEFT JOIN peraturan ON subunsur.idtahunaturan =
		  peraturan.idperaturan  where idpenilaian=?`,
			[ Id ],
			(err, result) => {
				if (err) reject(err);
				else resolve(result[0]);
			}
		);
	});
};

PenilaianDB.post = async (params) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				`insert into penilaian (iddosen, idsubunsur, uraiankegiatan, satuanhasil,
				jumlahkegiatan , tanggal, keterangan ) values(?,?,?,?,?,?,?)`,
				[
					params.iddosen,
					params.idsubunsur,
					params.uraiankegiatan,
					params.satuanhasil,
					params.jumlahkegiatan,
					params.tanggal,
					params.keterangan
				],
				(err, result) => {
					if (err) reject(err);
					else {
						params.idpenilaian = result.insertId;
						resolve(params);
					}
				}
			);
		} catch (error) {
			reject(error);
		}
	});
};

PenilaianDB.put = async (params) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				`update penilaian set iddosen=?, idsubunsur=?, uraiankegiatan=?,
				 satuanhasil=?, jumlahkegiatan=?,tanggal=?, keterangan=? where idpenilaian=?`,
				[
					params.iddosen,
					params.idsubunsur,
					params.uraiankegiatan,
					params.satuanhasil,
					params.jumlahkegiatan,
					params.tanggal,
					params.keterangan,
					params.idpenilaian
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

PenilaianDB.delete = (id) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query('delete from penilaian where idpenilaian=? ', [ id ], (err, result) => {
				if (err) {
					reject(err);
				} else resolve(true);
			});
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = PenilaianDB;
