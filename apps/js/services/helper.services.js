angular.module('helper.service', []).factory('helperServices', helperServices);

function helperServices() {
	var service = {};
	service.url = 'http://localhost:5500';

	return { url: service.url };
}
