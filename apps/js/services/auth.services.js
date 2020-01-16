angular.module('auth.service', []).factory('AuthService', AuthService);

function AuthService($http, $q, StorageService, $state, helperServices, message) {
	var service = {};

	return {
		login: login,
		logOff: logoff,
		userIsLogin: userIsLogin,
		getUserName: getUserName,
		userIsLogin: userIsLogin,
		userInRole: userInRole,
		getHeader: getHeader,
		getToken: getToken,
		url: service.url
	};

	function login(user) {
		var def = $q.defer();
		$http({
			method: 'post',
			url: helperServices.url + '/api/auth/login',
			headers: getHeader(),
			data: user
		}).then(
			(res) => {
				StorageService.addObject('user', res.data);
				def.resolve(res.data);
			},
			(err) => {
				def.reject();
				message.error(err);
			}
		);
		return def.promise;
	}

	function getHeader() {
		try {
			if (userIsLogin()) {
				return {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + getToken()
				};
			}
			throw new Error('Not Found Token');
		} catch (ex) {
			return {
				'Content-Type': 'application/json'
			};
		}
	}

	function getToken() {
		var result = StorageService.getObject('user');
		if (result) {
			return result.token;
		}
		return '';
	}

	function logoff() {
		StorageService.clear();
		$state.go('login');
	}

	function getUserName() {
		if (userIsLogin) {
			var result = StorageService.getObject('user');
			return result.username;
		}
	}

	function userIsLogin() {
		var result = StorageService.getObject('user');
		return result ? true : false;
	}

	function userInRole(role) {
		var result = StorageService.getItem('user');
		if (result && result.roles.find((x) => (x.name = role))) {
			return true;
		}
	}
	function profile() {
		var def = $q.defer();
		$http({
			method: 'get',
			url: helperServices.url + '/api/auth/profile',
			headers: getHeader(),
			data: user
		}).then(
			(res) => {
				def.resolve(res.data);
			},
			(err) => {
				def.reject();
				message.error(err);
			}
		);
		return def.promise;
	}
}
