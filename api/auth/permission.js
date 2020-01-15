permit = (...allowed) => {
	const isAllowed = (role) => allowed.indexOf(role) > -1;

	// return a middleware
	return (request, response, next) => {
		if (request.userId && isAllowed(request.role)) next();
		else {
			// role is allowed, so continue on the next middleware
			response.status(401).json({ message: 'Unauthorized' }); // user is forbidden
		}
	};
};
module.exports = permit;
