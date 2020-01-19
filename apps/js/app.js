angular
	.module('app', [
		'swangular',
		'message.service',
		'app.services',
		'app.routers',
		'app.controllers',
		'app.conponent',
		'ui.bootstrap'
	])
	.controller('homeController', homeController);

function homeController($scope, AuthService) {
	$scope.logOff = function() {
		AuthService.logOff();
	};
}
