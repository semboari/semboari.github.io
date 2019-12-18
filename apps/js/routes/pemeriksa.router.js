angular.module('app.pemeriksa.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/account/login');
	$stateProvider.state('pemeriksa', {
		url: '/pemeriksa',
		templateUrl: '../apps/views/pemeriksa/menu-pemeriksa.html'
	});
});
