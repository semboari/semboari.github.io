const pool = require('./dbconnection');
const rx = require('rxjs');
const helper = require('../helper');
const DosenDb = {};
DosenDb.get = () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
			dosen.iddosen,
			dosen.iduser,
			dosen.idprogramstudi,
			dosen.nidn,
			dosen.tanggallahir,
			dosen.tempatlahir,
			dosen.jeniskelamin,
			dosen.pendidikanterakhir,
			dosen.jabatanakademik,
			dosen.masakerja,
			dosen.idjabatan,
			dosen.namadosen,
			programstudi.namaprogramstudi,
			fakultas.namafakultas,
			universitas.namauniversitas,
			fakultas.idfakultas,
			universitas.iduniversitas,
			users.email,
			role.idrole,
			role.name AS rolename,
			role.deskripsi,
			jabatanfungsional.jabatan,
			jabatanfungsional.pangkat,
			jabatanfungsional.golongan,
			jabatanfungsional.ruang
		  FROM
			dosen
			LEFT JOIN programstudi ON dosen.idprogramstudi =
		  programstudi.idprogramstudi
			LEFT JOIN fakultas ON programstudi.idfakultas = fakultas.idfakultas
			LEFT JOIN universitas ON fakultas.iduniversitas =
		  universitas.iduniversitas
			LEFT JOIN users ON dosen.iduser = users.idusers
			LEFT JOIN userinrole ON users.idusers = userinrole.idusers
			LEFT JOIN role ON userinrole.idrole = role.idrole
			LEFT JOIN jabatanfungsional ON dosen.idjabatan =
		  jabatanfungsional.idjabatan
		  `,
			(err, result) => {
				if (err) reject(err);

				var datas = rx.of(result).pipe((data) => helper.GroupBy(result, (item) => item.iddosen));
				var dataDosen = Object.values(datas);
				var results = [];
				dataDosen.forEach((data) => {
					var dosen = data[0];
					dosen.roles = [];
					data.forEach((element) => {
						dosen.roles.push({
							idrole: element.idrole,
							rolename: element.rolename,
							deskripsi: element.deskripsi
						});
					});
					results.push(dosen);
				});

				resolve(results);
			}
		);
	});
};

DosenDb.getByProgdiId = (idprogdi) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
			dosen.iddosen,
			dosen.iduser,
			dosen.idprogramstudi,
			dosen.nidn,
			dosen.tanggallahir,
			dosen.tempatlahir,
			dosen.jeniskelamin,
			dosen.pendidikanterakhir,
			dosen.jabatanakademik,
			dosen.masakerja,
			dosen.idjabatan,
			dosen.namadosen,
			programstudi.namaprogramstudi,
			fakultas.namafakultas,
			universitas.namauniversitas,
			fakultas.idfakultas,
			universitas.iduniversitas,
			users.email,
			role.idrole,
			role.name AS rolename,
			role.deskripsi,
			jabatanfungsional.jabatan,
			jabatanfungsional.pangkat,
			jabatanfungsional.golongan,
			jabatanfungsional.ruang
		  FROM
			dosen
			LEFT JOIN programstudi ON dosen.idprogramstudi =
		  programstudi.idprogramstudi
			LEFT JOIN fakultas ON programstudi.idfakultas = fakultas.idfakultas
			LEFT JOIN universitas ON fakultas.iduniversitas =
		  universitas.iduniversitas
			LEFT JOIN users ON dosen.iduser = users.idusers
			LEFT JOIN userinrole ON users.idusers = userinrole.idusers
			LEFT JOIN role ON userinrole.idrole = role.idrole
			LEFT JOIN jabatanfungsional ON dosen.idjabatan =
		  jabatanfungsional.idjabatan where dosen.idprogramstudi=?
		  group by iddosen
		  `,
			[ idprogdi ],
			(err, result) => {
				if (err) reject(err);
				else {
					resolve(result);
				}
			}
		);
	});
};

DosenDb.getByUniversitasId = (iduniversitas) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
			dosen.iddosen,
			dosen.iduser,
			dosen.idprogramstudi,
			dosen.nidn,
			dosen.tanggallahir,
			dosen.tempatlahir,
			dosen.jeniskelamin,
			dosen.pendidikanterakhir,
			dosen.jabatanakademik,
			dosen.masakerja,
			dosen.idjabatan,
			dosen.namadosen,
			programstudi.namaprogramstudi,
			fakultas.namafakultas,
			universitas.namauniversitas,
			fakultas.idfakultas,
			universitas.iduniversitas,
			users.email,
			role.idrole,
			role.name AS rolename,
			role.deskripsi,
			jabatanfungsional.jabatan,
			jabatanfungsional.pangkat,
			jabatanfungsional.golongan,
			jabatanfungsional.ruang
		  FROM
			dosen
			LEFT JOIN programstudi ON dosen.idprogramstudi =
		  programstudi.idprogramstudi
			LEFT JOIN fakultas ON programstudi.idfakultas = fakultas.idfakultas
			LEFT JOIN universitas ON fakultas.iduniversitas =
		  universitas.iduniversitas
			LEFT JOIN users ON dosen.iduser = users.idusers
			LEFT JOIN userinrole ON users.idusers = userinrole.idusers
			LEFT JOIN role ON userinrole.idrole = role.idrole
			LEFT JOIN jabatanfungsional ON dosen.idjabatan =
		  jabatanfungsional.idjabatan where universitas.iduniversitas=? 	
		  group by iddosen
		  `,
			[ iduniversitas ],
			(err, result) => {
				if (err) reject(err);
				else resolve(result);
			}
		);
	});
};

DosenDb.put = (data) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`update dosen set iduser=?, idprogramstudi=?, nidn=?, tanggallahir=?, tempatlahir=?, jeniskelamin=?,
			 pendidikanterakhir=?, jabatanakademik=?, masakerja=?, idjabatan=?, namadosen=? where iddosen=?`,
			[
				data.iduser,
				data.idprogramstudi,
				data.nidn,
				data.tanggallahir,
				data.tempatlahir,
				data.jeniskelamin,
				data.pendidikanterakhir,
				data.jabatanakademik,
				data.masakerja,
				data.idjabatan,
				data.namadosen,
				data.iddosen
			],
			(err, result) => {
				if (err) reject(err);
				resolve(data);
			}
		);
	});
};

DosenDb.delete = (id) => {
	return new Promise((resolve, reject) => {
		pool.query('delete from dosen where iddosen=?', [ id ], (err, result) => {
			if (err) reject(err);
			resolve(result);
		});
	});
};

DosenDb.ChangeRole = (id, newrole) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			connection.beginTransaction((err) => {
				try {
					connection.query('select * from role where name=?', [ newrole ], (err, result) => {
						if (err) reject(err);
						if (result.length <= 0) reject('role tidak ditemukan');
						var datanewRole = result[0].idrole;
						connection.query(
							`SELECT role.name, userinrole.idusers, userinrole.idrole, role.deskripsi
							FROM
								userinrole
								LEFT JOIN role ON userinrole.idrole = role.idrole  where idusers=?`,
							[ id ],
							(err, result) => {
								if (err) reject(err);
								var role = result.find((x) => x.name !== 'dosen');
								if (role) {
									connection.query(
										'delete from userinrole where idusers=? and idrole=?',
										[ id, role.idrole ],
										(err, result) => {
											if (err) reject(err);
											connection.query(
												'insert into userinrole (idusers,idrole) values (?,?)',
												[ id, datanewRole ],
												(err, result) => {
													if (err) reject(err);
													connection.commit(function(err) {
														if (err) {
															return connection.rollback(function() {
																reject(err);
															});
														}
														return resolve(true);
													});
												}
											);
										}
									);
								} else {
									connection.query(
										'insert into userinrole (idusers,idrole) values (?,?)',
										[ id, datanewRole ],
										(err, result) => {
											if (err) reject(err);

											connection.commit(function(err) {
												if (err) {
													return connection.rollback(function() {
														reject(err);
													});
												}
												return resolve(true);
											});
										}
									);
								}
							}
						);
					});
				} catch (error) {
					connection.rollback(function() {
						connection.release();
						reject(error);
					});
				}
			});
		});
	});
};

module.exports = DosenDb;
