const pool = require('./dbconnection');
const rx = require('rxjs');
const helper = require('../helper');
const ProgdiDb = {};

ProgdiDb.get = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			programstudi `,
			(err, result) => {
				if (err) reject(err);
				resolve(result);
			}
		);
	});
};

ProgdiDb.getById = async (id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			programstudi where idprogramstudi=?`,
			[ id ],
			(err, result) => {
				if (err) reject(err);
				resolve(result[0]);
			}
		);
	});
};

ProgdiDb.getByParentId = async (id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
			programstudi.idprogramstudi,
			programstudi.idfakultas,
			programstudi.namaprogramstudi,
			fakultas.namafakultas,
			fakultas.iduniversitas,
			universitas.namauniversitas
		  FROM
			programstudi
			LEFT JOIN fakultas ON programstudi.idfakultas = fakultas.idfakultas
			LEFT JOIN universitas ON fakultas.iduniversitas =
		  universitas.iduniversitas where fakultas.idfakultas=?`,
			[ id ],
			(err, result) => {
				if (err) reject(err);
				resolve(result);
			}
		);
	});
};

ProgdiDb.getKaprodiByProdiId = async (id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
			programstudi.idprogramstudi,
			programstudi.namaprogramstudi,
			dosen.iddosen,
			dosen.iduser,
			dosen.idprogramstudi AS idprogramstudi1,
			dosen.nidn,
			dosen.tanggallahir,
			dosen.tempatlahir,
			dosen.jeniskelamin,
			dosen.pendidikanterakhir,
			dosen.jabatanakademik,
			dosen.masakerja,
			dosen.idjabatan,
			dosen.namadosen,
			role.name,
			jabatanfungsional.jabatan,
			jabatanfungsional.pangkat,
			jabatanfungsional.golongan,
			jabatanfungsional.ruang
		  FROM
			programstudi
			LEFT JOIN dosen ON programstudi.idprogramstudi =
		  dosen.idprogramstudi
			LEFT JOIN users ON dosen.iduser = users.idusers
			LEFT JOIN userinrole ON users.idusers = userinrole.idusers
			LEFT JOIN role ON userinrole.idrole = role.idrole
			LEFT JOIN jabatanfungsional ON dosen.idjabatan =
		  jabatanfungsional.idjabatan
			  where programstudi.idprogramstudi=? and name='kaprodi' 
			  group by iddosen`,
			[ id ],
			(err, result) => {
				if (err) reject(err);
				resolve(result[0]);
			}
		);
	});
};

ProgdiDb.post = async (params) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'insert into programstudi (idfakultas,namaprogramstudi) values(?,?)',
				[ params.idfakultas, params.namaprogramstudi ],
				(err, result) => {
					if (err) throw Error();

					params.idprogramstudi = result.insertId;
					resolve(params);
				}
			);
		} catch (error) {
			reject(error);
		}
	});
};

ProgdiDb.put = async (data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'update programstudi set namaprogramstudi=? where idprogramstudi=? ',
				[ data.namaprogramstudi, data.idprogramstudi ],
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

ProgdiDb.delete = (id) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query('delete from programstudi where idprogramstudi=? ', [ id ], (err, result) => {
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

module.exports = ProgdiDb;
