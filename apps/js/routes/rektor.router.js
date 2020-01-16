angular.module('rektor.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('rektor', {
		url: '/rektor',
		templateUrl: '../apps/views/rektor/menu-rektor.html'
	});

	$stateProvider.state('rektor-home', {
		url: '/home',
		parent: 'rektor',
		templateUrl: '../apps/views/rektor/home.html'
	});

	$stateProvider.state('rektor-pengusul', {
		url: '/pengusul',
		parent: 'rektor',
		templateUrl: '../apps/views/rektor/pengusul.html'
	});

	$stateProvider.state('rektor-berkas-pengusulan', {
		url: '/berkas-pengusulan',
		parent: 'rektor',
		templateUrl: '../apps/views/rektor/berkas-pengusulan.html'
	});
});
