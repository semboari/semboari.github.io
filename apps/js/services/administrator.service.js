angular.module('administrator.services', []).factory('AdministratorService', AdministratorService);

function AdministratorService($http, AuthService, helperServices, $q, message) {
	var controller = '/api/administrator/';
	var datas = [];

	return {
		get: get,
		post: post,
		put: put,
		delete: deleteItem
	};

	function get(id) {
		var defer = $q.defer();
		$http({
			url: helperServices.url + controller,
			method: 'get',
			headers: AuthService.getHeader()
		}).then(
			(x) => {
				datas = x.data;
				defer.resolve(datas);
			},
			(err) => {
				defer.reject(err);
				message.error(err);
			}
		);
		return defer.promise;
	}

	function post(data) {
		var defer = $q.defer();
		$http({
			url: helperServices.url + controller,
			method: 'post',
			data: data,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				datas.push(response.data);
				defer.resolve(response.data);
				message.info('Data Tersimpan !');
			},
			(err) => {
				message.error(err);
			}
		);

		return defer.promise;
	}

	function put(data) {
		var defer = $q.defer();
		$http({
			url: helperServices.url + controller,
			method: 'put',
			data: data,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				defer.resolve(response.data);
			},
			(err) => {
				message.error(err.message);
			}
		);

		return defer.promise;
	}

	function deleteItem(data) {
		var defer = $q.defer();
		$http({
			url: helperServices.url + controller + data.idpenilaian,
			method: 'delete',
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				defer.resolve(response.data);
			},
			(err) => {
				message.error(err.message);
			}
		);

		return defer.promise;
	}
}