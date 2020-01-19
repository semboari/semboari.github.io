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
		url: service.url,
		registerdosen: registerdosen,
		profile: profile,
		Init: Init
	};

	function Init(roles) {
		if (userInRole(roles)) {
			return;
		} else {
			$state.go('login');
		}
	}

	function profile() {
		var def = $q.defer();
		var profile = StorageService.getObject('profile');
		if (profile) def.resolve(profile);
		else {
			var result = StorageService.getObject('user');
			if (!result) {
				message.error('Silahkan Login');
				$state.go('login');
			} else
				$http({
					method: 'get',
					url: helperServices.url + '/api/auth/profile/' + result.idusers,
					headers: getHeader()
				}).then(
					(res) => {
						StorageService.addObject('profile', res.data);
						def.resolve(res.data);
					},
					(err) => {
						def.reject();
						message.error(err);
					}
				);
		}
		return def.promise;
	}

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

	function registerdosen(user) {
		var def = $q.defer();
		$http({
			method: 'post',
			url: helperServices.url + '/api/auth/registerdosen',
			headers: getHeader(),
			data: user
		}).then(
			(res) => {
				StorageService.addObject('user', res.data);
				def.resolve(res.data);
			},
			(err) => {
				message.error(err);
			}
		);
		return def.promise;
	}

	function getHeader() {
		try {
			if (userIsLogin()) {
				var token = getToken();
				if (!token) throw new Error('Not Found Token');

				return {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token
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

	function userInRole(roles) {
		var result = StorageService.getObject('user');
		var found = false;
		if (result) {
			roles.forEach((role) => {
				var data = result.roles.find((x) => (x.name = role));
				if (data) {
					found = true;
					return;
				}
			});
		}

		return found;
	}
}
