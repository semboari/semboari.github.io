const dbContext = {
	Users: require('./user.db'),
	Roles: require('./role.db'),
	Universitas: require('./universitas.db'),
	Fakultas: require('./fakultas.db'),
	ProgramStudi: require('./programstudi.db'),
	Unsur: require('./unsur.db'),
	SubUnsur: require('./subunsur.db'),
	Peraturan: require('./peraturan.db'),
	JabatanFuntional: require('./jabatanfungsional.db'),
	Dosen: require('./dosen.db'),
	Penilaian: require('./penilaian.db'),
	Administrator: require('./administrator.db')
};

module.exports = dbContext;
