angular.module('rektor.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('rektor', {
		url: '/rektor',
		controller: 'rektor.controller',
		templateUrl: '../apps/views/rektor/menu-rektor.html'
	});

	$stateProvider.state('rektor-home', {
		url: '/home',
		parent: 'rektor',
		controller: 'rektor.home.controller',
		templateUrl: '../apps/views/rektor/home.html'
	});

	$stateProvider.state('rektor-pengusul', {
		url: '/pengusul',
		parent: 'rektor',
		controller: 'rektor.dosen.controller',
		templateUrl: '../apps/views/rektor/pengusul.html'
	});

	$stateProvider.state('rektor-berkas-pengusulan', {
		url: '/berkas-pengusulan/:{Id:json}',
		parent: 'rektor',
		controller: 'rektor.pengusulan.controller',
		templateUrl: '../apps/views/rektor/berkas-pengusulan.html'
	});
});
