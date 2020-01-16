angular.module('auth.controller', []).controller('LoginController', LoginController);

function LoginController($scope, $state, AuthService) {
	$scope.login = function(user) {
		AuthService.login(user).then((x) => {
			var role = x.roles[0];
			$state.go(role + '-home');
		});
	};
}
