const pool = require('./dbconnection');
const bcrypt = require('bcryptjs');

const UserDb = {};

UserDb.login = async (user) => {
	return new Promise((resolve, reject) => {
		pool.query(
			//      'select * from users where userName=? or email=?',
			'select * from users',
			(err, result) => {
				if (err) {
					return reject(err);
				}

				if (result.length <= 0) {
					var sql = 'insert into role (name) values ? ';
					var values = [ [ 'admin' ], [ 'dosen' ], [ 'kaprodi' ], [ 'pemeriksa' ], [ 'rektor' ] ];
					pool.query(sql, [ values ], (err, result) => {
						if (err) {
							return reject(err);
						}
						var password = bcrypt.hashSync(user.password, 8);
						pool.query(
							'insert into users (username,password,email) values(?,?,?)',
							[ user.username, password, user.username ],
							(err, result) => {
								if (err) {
									return reject(err);
								}

								if (result.insertId > 0) {
									user.idUser = result.insertId;

									pool.query('select * from role where name=?', [ 'admin' ], (err, roleResult) => {
										if (err) return reject(err);

										var data = roleResult[0];

										pool.query(
											'insert into userinrole(idusers,idrole) values(?,?)',
											[ user.idUser, data.idrole ],
											(err, result) => {
												if (err) return reject(err);

												return resolve(user);
											}
										);
									});
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
								return reject(err);
							}
							return resolve(result[0]);
						}
					);
				}
			}
		);
	});
};

UserDb.registerDOsen = async (dosen) => {
	return new Promise((resolve, reject) => {
		pool.query('select * from role where name=?', [ 'dosen' ], (err, roleResult) => {
			if (err) return reject(err);
			var idrole = roleResult[0];
			pool.query('insert into dosen ()');
		});
	});
};

module.exports = UserDb;
