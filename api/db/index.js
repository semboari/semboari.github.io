const dbContext = {
	Users: require('./user.db'),
	Roles: require('./role.db'),
	Universitas: require('./universitas.db'),
	Fakultas: require('./fakultas.db'),
	ProgramStudi: require('./programstudi.db'),
	Unsur: require('./user.db')
};

module.exports = dbContext;
