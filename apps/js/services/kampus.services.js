angular
	.module('kampus.service', [])
	.factory('UniversitasService', UniversitasService)
	.factory('FakultasService', FakultasService)
	.factory('ProgdiService', ProgdiService);

function UniversitasService($http, $q, helperServices, AuthService, message) {
	var instance = false;
	var datas = [];

	function get() {
		var defer = $q.defer();
		var a = AuthService.getHeader();
		if (instance) {
			defer.resolve(data);
		} else {
			$http({
				url: helperServices.url + '/api/universitas',
				method: 'get',
				headers: AuthService.getHeader()
			}).then(
				(x) => {
					datas = x.data;
					defer.resolve(datas);
				},
				(err) => {
					message.error('err.message');
				}
			);
		}

		return defer.promise;
	}

	function getById(id) {
		var defer = $q.defer();
		if (instance) {
			var result = datas.find((x) => (x.iduniversitas = id));

			defer.resolve(result);
		} else {
			$http({
				url: helperServices.url + '/api/universitas/' + id,
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
			url: helperServices.url + '/api/universitas',
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
			url: helperServices.url + '/api/universitas',
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
			url: helperServices.url + '/api/universitas/' + data.iduniversitas,
			method: 'delete',
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				var index = datas.indexOf(data);
				datas.splice(index, 1);
				defer.resolve(response.data);
			},
			(err) => {
				message.error(err.message);
			}
		);

		return defer.promise;
	}

	return {
		get: get,
		post: post,
		getById: getById,
		put: put,
		delete: deleteItem

	};
};


function FakultasService($http, $q, helperServices, AuthService, message) {
	var instance = false;
	var datas = [];

	function get() {
		var defer = $q.defer();
		var a = AuthService.getHeader();
		if (instance) {
			defer.resolve(data);
		} else {
			$http({
				url: helperServices.url + '/api/fakultas',
				method: 'get',
				headers: AuthService.getHeader()
			}).then(
				(x) => {
					datas = x.data;
					defer.resolve(datas);
				},
				(err) => {
					message.error('err.message');
				}
			);
		}

		return defer.promise;
	}

	function getById(id) {
		var defer = $q.defer();
		if (instance) {
			var result = datas.find((x) => (x.idfakultas = id));

			defer.resolve(result);
		} else {
			$http({
				url: helperServices.url + '/api/fakultas/' + id,
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

	function getByPerentId(id) {
		var defer = $q.defer();
		$http({
			url: helperServices.url + '/api/fakultas/getbyparentid' + id,
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
		return defer.promise;
	}

	function post(data) {
		var defer = $q.defer();
		$http({
			url: helperServices.url + '/api/fakultas',
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
			url: helperServices.url + '/api/fakultas',
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
			url: helperServices.url + '/api/fakultas/' + data.idfakultas,
			method: 'delete',
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				var index = datas.indexOf(data);
				datas.splice(index, 1);
				defer.resolve(response.data);
			},
			(err) => {
				message.error(err.message);
			}
		);

		return defer.promise;
	}
	return {
		get: get,
		post: post,
		getById: getById,
		put: put,
		delete: deleteItem,
		getByPerentId: getByPerentId
	};
}

function ProgdiService($http, $q, helperServices, message) {
	var instance = false;

	function get(fakultasId) {
		var defer = $q.defer();
		$http({
			url: helperServices.url + '/Progdi?fakultasId=' + fakultasId,
			method: 'get',
			headers: AuthService.getHeader()
		}).then(
			(x) => {
				datas = x.datas;
				defer.resolve(x.data);
			},
			(err) => {
				message.error('err.message');
				defer.reject(err);
			}
		);

		return defer.promise;
	}

	function getById(id) {
		var defer = $q.defer();
		$http({
			url: helperServices.url + '/Progdi/' + id,
			method: 'get',
			headers: AuthService.getHeader()
		}).then(
			(x) => {
				datas = x.datas;
				defer.resolve(x.data);
			},
			(err) => {
				message.error('err.message');
				defer.reject(err);
			}
		);
		return defer.promise;
	}

	function post(data) {
		var defer = $q.defer();
		$http({
			url: helperServices.url + 'Progdi',
			method: 'post',
			data: datas,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				defer.resolve(response.data);
				datas.push(response.data);
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
			url: helperServices.url + '/Progdi/' + data.id,
			method: 'put',
			data: datas,
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
			url: helperServices.url + '/Progdi/' + data.id,
			method: 'delete',
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				var index = data.indexOf(data);
				datas.splice(index, 1);
				defer.resolve(response.data);
			},
			(err) => {
				message.error(err.message);
			}
		);

		return defer.promise;
	}

	return {
		get: get,
		post: post,
		getById: getById,
		put: put,
		delete: deleteItem
	};
}