angular.module('app.dosen.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/account/login');
	$stateProvider.state('dosen', {
		url: '/dosen',
		templateUrl: '../apps/views/dosen/menu-dosen.html'
	});
});
