angular
	.module('app', [
		'app.account.router',
		'app.admin.router',
		'app.dosen.router',
		'app.kaprodi.router',
		'app.rektor.router',
		'app.pemeriksa.router',

		'swangular',
		'message.service',

		'auth.service',
		'storage.services',
		'helper.service',
		'admin.service',

		'app.conponent',

		'auth.controller',
		'admin.controller'
	])
	.controller('homeController', homeController);

function homeController($scope, AuthService) {
	$scope.logOff = function () {
		AuthService.logOff();
	};
}