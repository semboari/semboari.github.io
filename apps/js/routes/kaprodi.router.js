angular.module('app.kaprodi.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/account/login');
	$stateProvider.state('kaprodi', {
		url: '/kaprodi',
		templateUrl: '../apps/views/kaprodi/menu-kaprodi.html'
	});
});
