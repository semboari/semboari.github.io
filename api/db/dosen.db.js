const pool = require('./dbconnection');
const DosenDb = {};
DosenDb.get = () => {
	return new Promise((resolve, reject) => {
		pool.query('select * from dosen', (err, result) => {
			if (err) reject(err);
			resolve(result.inserId);
		});
	});
};

DosenDb.post = (data) => {
	return new Promise((resolve, reject) => {
		pool.query('insert into dosen () values (?,?,?,?,?,?,?,?)', [ data ], (err, result) => {
			if (err) reject(err);
			resolve(result.inserId);
		});
	});
};

DosenDb.put = (id, data) => {
	return new Promise((resolve, reject) => {
		pool.query('update dosen set ', [], (err, result) => {
			if (err) reject(err);
			resolve(result.inserId);
		});
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

module.exports = DosenDb;
