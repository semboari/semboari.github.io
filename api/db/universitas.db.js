const pool = require('./dbconnection');
const rx = require('rxjs');
const helper = require('../helper');
const UniversitasDb = {};

UniversitasDb.get = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			universitas `,
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

UniversitasDb.getById = async (Id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
		  universitas where iduniversitas=?`,
			[ Id ],
			(err, result) => {
				if (err) return reject(err);
				resolve(result[0]);
			}
		);
	});
};

UniversitasDb.post = async (univ) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'insert into universitas (namauniversitas) values(?)',
				[ univ.namauniversitas ],
				(err, result) => {
					if (err) throw Error();

					univ.iduniversitas = result.insertId;
					resolve(univ);
				}
			);
		} catch (error) {
			reject(error);
		}
	});
};

UniversitasDb.put = async (data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'update universitas set namauniversitas=? where iduniversitas=? ',
				[ data.namauniversitas, data.iduniversitas ],
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

UniversitasDb.delete = (id) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query('delete from universitas where iduniversitas=? ', [ id ], (err, result) => {
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

module.exports = UniversitasDb;

// var datas = rx.of(result).pipe((data) => helper.GroupBy(result, (item) => item.iduniversitas));
// 				var dataUniv = Object.values(datas);
// 				var results = [];
// 				dataUniv.forEach((univ) => {
// 					var universitas = {
// 						fakultas: [],
// 						iduniversitas: univ[0].iduniversitas,
// 						namauniversitas: univ[0].namauniversitas
// 					};

// 					var dataFakultas = Object.values(
// 						rx.of(univ).pipe((data) => helper.GroupBy(univ, (item) => item.idfakultas))
// 					);
// 					dataFakultas.forEach((fakul) => {
// 						var fakultas = {
// 							programstudi: [],
// 							namafakultas: fakul[0].namafakultas,
// 							idfakultas: fakul[0].idfakultas
// 						};

// 						fakultas.programstudi = fakul.map((prog) => ({
// 							idprogramstudi: prog.idprogramstudi,
// 							namaprogramstudi: prog.namaprogramstudi
// 						}));

// 						universitas.fakultas.push(fakultas);
// 					});
// 					results.push(universitas);
// 				});
