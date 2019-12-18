angular.module('app.rektor.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/account/login');
	$stateProvider.state('rektor', {
		url: '/rektor',
		templateUrl: '../apps/views/rektor/menu-rektor.html'
	});
});
