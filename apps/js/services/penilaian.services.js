angular.module('penilaian.service', []).factory('PenilaianService', PenilaianService);

function PenilaianService($http, AuthService, helperServices, $q, message) {
	var controller = '/api/penilaian/';
	var datas = [];

	return { get: get, post: post, put: put, delete: deleteItem, rekapitulasi: rekapitulasi };

	function get(id) {
		var defer = $q.defer();
		$http({
			url: helperServices.url + controller + id,
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

	function rekapitulasi(id) {
		var defer = $q.defer();
		$http({
			url: helperServices.url + controller + 'rekapitulasi/' + id,
			method: 'get',
			headers: AuthService.getHeader()
		}).then(
			(x) => {
				defer.resolve(x);
			},
			(err) => {
				defer.reject(err);
				message.error(err);
			}
		);
		return defer.promise;
	}
}
