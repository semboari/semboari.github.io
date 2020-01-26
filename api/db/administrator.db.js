const pool = require('./dbconnection');
const rx = require('rxjs');
const helper = require('../helper');
const AdministratorDb = {};

AdministratorDb.get = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
			administrator.*,
			universitas.namauniversitas,
			users.email,
			users.photo,
			users.aktif,
			administrator.idusers AS idusers1
		  FROM
			administrator
			LEFT JOIN universitas ON administrator.iduniversitas =
		  universitas.iduniversitas
			LEFT JOIN users ON administrator.idusers = users.idusers`,
			(err, result) => {
				if (err) reject(err);
				resolve(result);
			}
		);
	});
};

AdministratorDb.profile = async (Id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
			users.idusers,
			users.username,
			users.email,
			users.photo,
			users.aktif,
			administrator.idadministrator,
			administrator.nama,
			administrator.telepon,
			universitas.iduniversitas,
			universitas.namauniversitas
		  FROM
			users
			LEFT JOIN administrator ON users.idusers = administrator.idusers
			LEFT JOIN universitas ON administrator.iduniversitas =
		  universitas.iduniversitas where users.idusers=? and idadministrator is not null`,
			[Id],
			(err, result) => {
				if (err) reject(err);
				resolve(result[0]);
			}
		);
	});
};

AdministratorDb.getByUserId = async (Id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
			administrator.*,
			universitas.namauniversitas
		  FROM
			administrator
			LEFT JOIN universitas ON administrator.iduniversitas =
		  universitas.iduniversitas where idusers=?`,
			[Id],
			(err, result) => {
				if (err) reject(err);
				resolve(result[0]);
			}
		);
	});
};

AdministratorDb.post = async (data) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			try {
				connection.beginTransaction((err) => {
					if (err) reject(err);
					connection.query('select * from role where name=?', ['administrator'], (err, roleResult) => {
						if (err) reject(err);
						var role = roleResult[0];
						connection.query(
							'insert into users (username, password, email) values(?,?,?)',
							[data.email, data.password, data.email],
							(err, userResult) => {
								if (err) reject(err);
								else data.iduser = userResult.insertId;
								connection.query(
									'insert into userinrole(idusers, idrole) values (?,?)',
									[data.iduser, role.idrole],
									(err, result) => {
										if (err) reject(err);
										else
											data.idusers = connection.query(
												`insert into administrator(idusers,iduniversitas,nama, telepon) values (?,?,?,?)`,
												[data.iduser, data.iduniversitas, data.nama, data.telepon],
												(err, result) => {
													if (err) reject(err);
													else {
														data.idadministrator = result.insertId;
														data.role = 'administrator';
														helper.sendEmail({
																to: data.email,
																subject: 'Account',
																password: data.passwordText
															})
															.then(
																(x) => {
																	connection.commit(function (err) {
																		if (err) {
																			return connection.rollback(function () {
																				reject(err);
																			});
																		} else {
																			resolve(data);
																		}
																	});
																},
																(err) => {
																	reject(err);
																}
															);
													}
												}
											);
									}
								);
							}
						);
					});
				});
			} catch (error) {
				connection.rollback(function () {
					connection.release();
					reject(error);
				});
			}
		});
	});
};

AdministratorDb.put = async (data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'update administrator set nama=?, telepon=? where idadministrator=? ',
				[data.nama, data.telepon, data.idadministrator],
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

AdministratorDb.delete = (id) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query('delete from administrator where idadministrator=? ', [id], (err, result) => {
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

module.exports = AdministratorDb;