const pool = require('./dbconnection');
const rx = require('rxjs');
const helper = require('../helper');
const UniversitasDb = {};

UniversitasDb.get = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
			universitas.namauniversitas, fakultas.idfakultas,
			fakultas.iduniversitas, fakultas.namafakultas,
			programstudi.idprogramstudi, programstudi.namaprogramstudi
		  FROM
			universitas LEFT JOIN
			fakultas ON universitas.iduniversitas = fakultas.iduniversitas
			LEFT JOIN
			programstudi ON fakultas.idfakultas = programstudi.idfakultas;`,
			(err, result) => {
				if (err) return reject(err);
				var datas = rx.of(result).pipe((data) => helper.GroupBy(result, (item) => item.iduniversitas));
				var dataUniv = Object.values(datas);
				var results = [];
				dataUniv.forEach((univ) => {
					var universitas = {
						fakultas: [],
						iduniversitas: univ[0].iduniversitas,
						namauniversitas: univ[0].namauniversitas
					};

					var dataFakultas = Object.values(
						rx.of(univ).pipe((data) => helper.GroupBy(univ, (item) => item.idfakultas))
					);
					dataFakultas.forEach((fakul) => {
						var fakultas = {
							programstudi: [],
							namafakultas: fakul[0].namafakultas,
							idfakultas: fakul[0].idfakultas
						};

						fakultas.programstudi = fakul.map((prog) => ({
							idprogramstudi: prog.idprogramstudi,
							namaprogramstudi: prog.namaprogramstudi
						}));

						universitas.fakultas.push(fakultas);
					});
					results.push(universitas);
				});

				resolve(results);
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
					resolve(resolve.insertId);
				}
			);
		} catch (error) {
			reject(error);
		}
	});
};

UniversitasDb.put = (id, data) => {
	return new Promise((resolve, reject) => {
		pool.query('update universitas set ', [], (err, result) => {});
	});
};

UniversitasDb.delete = () => {
	return new Promise((resolve, reject) => {
		pool.query('delete from universitas where iduniversitas=?', [], (err, result) => {});
	});
};

module.exports = UniversitasDb;
