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
		url: service.url
	};

	function login(user) {
		var def = $q.defer();
		var a = helperServices.url;
		var b = getHeader();
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

	function logoff() {
		StorageService.clear();
		$state.go('login');
	}

	function getUserName() {
		if (userIsLogin) {
			var result = StorageService.getObject('user');
			return result.Username;
		}
	}

	function userIsLogin() {
		var result = StorageService.getObject('user');
		if (result) {
			return true;
		}
	}

	function userInRole(role) {
		var result = StorageService.getItem('user');
		if (result && result.roles.find((x) => (x.name = role))) {
			return true;
		}
	}
}
