const pool = require('./dbconnection');
const bcrypt = require('bcryptjs');
const helper = require('../helper');

const UserDb = {};

UserDb.login = async (user) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err);
			} else
				connection.beginTransaction((err) => {
					try {
						if (err) reject(err);
						else
							connection.query('select * from users', (err, result) => {
								if (err) {
									reject(err);
								} else {
									if (result.length <= 0) {
										var sql = 'insert into role (name,deskripsi) values ? ';
										var values = [
											['admin', 'Admin'],
											['administrator', 'Administrator'],
											['dosen', 'Dosen'],
											['kaprodi', 'Kaprodi'],
											['pemeriksa', 'Pemeriksa Penelitian'],
											['rektor', 'Rektor']
										];
										connection.query(sql, [values], (err, result) => {
											if (err) {
												reject(err);
											}
											var password = bcrypt.hashSync(user.password, 8);
											connection.query(
												'insert into users (username,password,email) values(?,?,?)',
												[user.username, password, user.username],
												(err, result) => {
													if (err) {
														reject(err);
													}

													if (result.insertId > 0) {
														user.idUser = result.insertId;

														connection.query(
															'select * from role where name=?',
															['admin'],
															(err, roleResult) => {
																if (err) reject(err);

																var data = roleResult[0];

																connection.query(
																	'insert into userinrole(idusers,idrole) values(?,?)',
																	[user.idUser, data.idrole],
																	(err, result) => {
																		if (err) reject(err);
																		connection.commit(function (err) {
																			if (err) {
																				return connection.rollback(function () {
																					reject(err);
																				});
																			}
																			return resolve(result[0]);
																		});
																	}
																);
															}
														);
													}
													return reject('Data Tidak Tersimpan');
												}
											);
										});
									} else {
										pool.query(
											`SELECT users.idusers, users.username, users.password, users.email, users.photo,
									role.name as role
								  FROM
									users LEFT JOIN
									userinrole ON users.idusers = userinrole.idusers LEFT JOIN
									role ON userinrole.idrole = role.idrole where users.username=? or users.email=?`,
											[user.username, user.username],
											(err, result) => {
												if (err) {
													reject(err);
												} else {
													connection.commit(function (err) {
														if (err) {
															connection.rollback(function () {
																reject(err);
															});
														} else resolve(result);
													});
												}
											}
										);
									}
								}
							});
					} catch (error) {
						connection.rollback(function () {
							connection.release();
							reject(error);
						});
					}
				});
		});
	});
};

UserDb.changepassword = async (user) => {
	return new Promise((resolve, reject, nex) => {
		pool.query('update users set password=? where idusers=?', [user.newpassword, user.idusers], (err, result) => {
			if (err) {
				return reject(err);
			} else resolve(true);
		});
	});
};

UserDb.changeFoto = async (user) => {
	return new Promise((resolve, reject, nex) => {
		pool.query('update users set photo=? where idusers=?', [user.photo, user.idusers], (err, result) => {
			if (err) {
				return reject(err);
			} else resolve(true);
		});
	});
};

UserDb.registerDosen = async (dosen) => {
	return new Promise((resolve, reject, next) => {

		helper
			.sendEmail({
				to: dosen.email,
				subject: 'Account',
				password: dosen.passwordText
			})
			.then(
				(x) => {
					pool.getConnection((err, connection) => {
						try {
							connection.beginTransaction((err) => {
								if (err) reject(err);
								connection.query('select * from role where name=?', ['dosen'], (err, roleResult) => {
									if (err) {
										reject(err);
									} else {
										var role = roleResult[0];
										connection.query(
											'insert into users (username, password, email) values(?,?,?)',
											[dosen.nidn, dosen.password, dosen.email],
											(err, userResult) => {
												if (err) {
													reject(err);
												} else {
													dosen.iduser = userResult.insertId;
													connection.query(
														'insert into userinrole(idusers, idrole) values (?,?)',
														[dosen.iduser, role.idrole],
														(err, result) => {
															if (err)
																reject(err);
															else {
																connection.query(
																	`insert into dosen(iduser,idjabatan, nidn, tanggallahir, tempatlahir, jeniskelamin, pendidikanterakhir,
																	 jabatanakademik, masakerja, idprogramstudi, namadosen) values (?,?,?,?,?,?,?,?,?,?,?)`,
																	[
																		dosen.iduser,
																		dosen.idjabatan,
																		dosen.nidn,
																		dosen.tanggallahir,
																		dosen.tempatlahir,
																		dosen.jeniskelamin,
																		dosen.pendidikanterakhir,
																		dosen.jabatanakademik,
																		dosen.masakerja,
																		dosen.idprogramstudi,
																		dosen.namadosen
																	],
																	(err, result) => {
																		if (err) reject(err);
																		else {
																			dosen.iddosen = result.insertId;
																			dosen.role = 'dosen';
																			connection.commit(function (err) {
																				if (err) {
																					return connection.rollback(function () {
																						reject(err);
																					});
																				} else {
																					resolve(dosen);
																				}
																			});
																		}
																	}
																);
															}
														}
													);
												}
											}
										);
									}

								});
							});
						} catch (error) {
							connection.rollback(function () {
								connection.release();
								reject(error);
							});
						}
					});
				},
				(err) => {
					reject(err);
				}
			);
	});
};

UserDb.profile = async (userId) => {
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
		users.email,users.photo,
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
	  jabatanfungsional.idjabatan where iduser =?`,
			[userId],
			(err, result) => {
				if (err) {
					return reject(err);
				}
				return resolve(result[0]);
			}
		);
	});
};

module.exports = UserDb;