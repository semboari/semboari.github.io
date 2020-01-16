const pool = require('./dbconnection');
const bcrypt = require('bcryptjs');

const UserDb = {};

UserDb.login = async (user) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			connection.beginTransaction((err) => {
				try {
					if (err) throw err;
					connection.query('select * from users', (err, result) => {
						if (err) {
							throw err;
						}

						if (result.length <= 0) {
							var sql = 'insert into role (name) values ? ';
							var values = [ [ 'admin' ], [ 'dosen' ], [ 'kaprodi' ], [ 'pemeriksa' ], [ 'rektor' ] ];
							connection.query(sql, [ values ], (err, result) => {
								if (err) {
									throw err;
								}
								var password = bcrypt.hashSync(user.password, 8);
								connection.query(
									'insert into users (username,password,email) values(?,?,?)',
									[ user.username, password, user.username ],
									(err, result) => {
										if (err) {
											throw err;
										}

										if (result.insertId > 0) {
											user.idUser = result.insertId;

											connection.query(
												'select * from role where name=?',
												[ 'admin' ],
												(err, roleResult) => {
													if (err) throw err;

													var data = roleResult[0];

													connection.query(
														'insert into userinrole(idusers,idrole) values(?,?)',
														[ user.idUser, data.idrole ],
														(err, result) => {
															if (err) throw err;
															connection.commit(function(err) {
																if (err) {
																	return connection.rollback(function() {
																		throw err;
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
								`SELECT users.idusers, users.username, users.password, users.email,
								role.name as role
							  FROM
								users LEFT JOIN
								userinrole ON users.idusers = userinrole.idusers LEFT JOIN
								role ON userinrole.idrole = role.idrole where users.username=? or users.email=?`,
								[ user.username, user.username ],
								(err, result) => {
									if (err) {
										throw err;
									}
									connection.commit(function(err) {
										if (err) {
											return connection.rollback(function() {
												throw err;
											});
										}
										return resolve(result);
									});
								}
							);
						}
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

UserDb.registerDosen = async (dosen) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			try {
				connection.beginTransaction((err) => {
					if (err) throw err;
					connection.query('select * from role where name=?', [ 'dosen' ], (err, roleResult) => {
						if (err) throw err;
						var role = roleResult[0];
						connection.query(
							'insert into users (username, password, email)',
							[ dosen.email, user.password, dosen.email ],
							(err, userResult) => {
								if (err) throw err;
								connection.query(
									'insert into userinrole(iduser, idrole)',
									[ userResult.insertId, role.idrole ],
									(err, result) => {
										if (err) throw err;
										connection.query(
											`insert into dosen(nidn, tanggallahir, tempatlahir, jeniskelamin, pendidikanterakhir,
												 jabatanakademik, masakerja, idprogramstudi) values (?,?,?,?,?,?,?,?)`,
											[
												dosen.nidn,
												dosen.tanggallahir,
												dosen.tempatlahir,
												dosen.jeniskelamin,
												dosen.pendidikanterakhir,
												dosen.jabatanakademik,
												dosen.masakerja,
												dosen.idprogramstudi
											],
											(err, result) => {
												if (err) throw err;

												dosen.iddosen = result.insertId;
												dosen.role = 'dosen';
												connection.commit(function(err) {
													if (err) {
														return connection.rollback(function() {
															throw err;
														});
													}
													resolve(dosen);
												});
											}
										);
									}
								);
							}
						);
					});
				});
			} catch (error) {
				connection.rollback(function() {
					connection.release();
					reject(error);
				});
			}
		});
	});
};

UserDb.profile = async (userId) => {
	return new Promise((resolve, reject) => {
		pool.query('select * from dosen where userid =?', [ idDosen ], (err, result) => {
			if (err) {
				return reject(err);
			}
			return resolve(result[0]);
		});
	});
};

module.exports = UserDb;
