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
			unsur.nama AS namaunsur,
			peraturan.tahun, subunsur.ak,
			subunsur.ak * penilaian.jumlahkegiatan AS akview,
			subunsur.satuanhasil AS satuanhasil1,
			penilaian.acckaprodi,
			penilaian.accrektor,
			penilaian.accpenelitian
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
			unsur.nama AS namaunsur,
			peraturan.tahun,
			penilaian.acckaprodi,
			penilaian.accrektor,
			penilaian.accpenelitian, subunsur.ak,			
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
				 satuanhasil=?, jumlahkegiatan=?,tanggal=?, keterangan=?,
				 acckaprodi=?, accrektor=?, accpenelitian=? where idpenilaian=?`,
				[
					params.iddosen,
					params.idsubunsur,
					params.uraiankegiatan,
					params.satuanhasil,
					params.jumlahkegiatan,
					params.tanggal,
					params.keterangan,
					params.acckaprodi,
					params.accrektor,
					params.accpenelitian,
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

PenilaianDB.rekapitulasi = (id) => {
	return new Promise((resolve, reject) => {
		try {
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
				unsur.idunsur,
				unsur.nama AS namaunsur,
				peraturan.tahun, subunsur.ak,
				subunsur.ak * penilaian.jumlahkegiatan AS akview,
				subunsur.satuanhasil AS satuanhasil1,
				penilaian.acckaprodi,
				penilaian.accrektor,
				penilaian.accpenelitian
			  FROM
				penilaian
				LEFT JOIN subunsur ON penilaian.idsubunsur = subunsur.idsubunsur
				LEFT JOIN unsur ON subunsur.idunsur = unsur.idunsur
				LEFT JOIN peraturan ON subunsur.idtahunaturan =
			  peraturan.idperaturan where iddosen=? `,
				[ id ],
				(err, result) => {
					if (err) reject(err);
					else {
						var datas = rx.of(result).pipe((data) => helper.GroupBy(result, (item) => item.idunsur));
						var dataUnsur = Object.values(datas);
						var results = [];
						dataUnsur.forEach((unsur) => {
							var Unsur = {
								subunsur: [],
								idunsur: unsur[0].idunsur,
								namaunsur: unsur[0].namaunsur
							};

							var dataSubUnsur = Object.values(
								rx.of(unsur).pipe((data) => helper.GroupBy(unsur, (item) => item.idsubunsur))
							);
							dataSubUnsur.forEach((sub) => {
								var subUnsur = {
									namasubunsur: sub[0].namasubunsur,
									idsubunsur: sub[0].idsubunsur
								};
								var datasubunsur = sub.map((prog) => prog);
								subUnsur.totalsubunsur = datasubunsur.reduce((total, item) => {
									return total + item.akview;
								}, 0);

								Unsur.subunsur.push(subUnsur);
								Unsur.total = Unsur.subunsur.reduce((total, item) => {
									return total + item.totalsubunsur;
								}, 0);
							});
							results.push(Unsur);
						});

						resolve(results);
					}
				}
			);
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = PenilaianDB;
