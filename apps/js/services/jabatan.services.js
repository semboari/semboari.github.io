angular.module('jabatan.service', []).factory('JabatanService', JabatanService);

function JabatanService($http, $q, helperServices, AuthService, message) {
	var instance = false;
	var datas = [];
	var controller = '/api/jabatanfungsional/';
	return {
		get: get,
		getById: getById,
		post: post,
		put: put,
		delete: deleteItem
	};

	function get() {
		var defer = $q.defer();
		var a = AuthService.getHeader();
		if (instance) {
			defer.resolve(data);
		} else {
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
					message.error(err);
				}
			);
		}

		return defer.promise;
	}

	function getById(id) {
		var defer = $q.defer();
		if (instance) {
			var result = datas.find((x) => (x.idjabatan = id));

			defer.resolve(result);
		} else {
			$http({
				url: helperServices.url + controller + id,
				method: 'get',
				headers: AuthService.getHeader()
			}).then(
				(x) => {
					defer.resolve(x.data);
				},
				(err) => {
					message.error('err.message');
					defer.reject(err.message);
				}
			);
		}
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
			},
			(err) => {
				message.error(err.message);
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
			url: helperServices.url + controller + data.idjabatan,
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
