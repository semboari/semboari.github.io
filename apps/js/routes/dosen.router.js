angular.module('dosen.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('dosen', {
		url: '/dosen',
		controller: 'dosen.controller',
		templateUrl: '../apps/views/dosen/menu-dosen.html'
	});

	$stateProvider.state('dosen-home', {
		url: '/home',
		parent: 'dosen',
		controller: 'dosen.home.controller',
		templateUrl: '../apps/views/dosen/home.html'
	});

	$stateProvider.state('dosen-pengusulan', {
		url: '/pengusulan',
		parent: 'dosen',
		controller: 'dosen.pengusulan.controller',
		templateUrl: '../apps/views/dosen/pengusulan.html'
	});

	$stateProvider.state('dosen-tambah-pengusulan', {
		url: '/tambah-pengusulan/:Id',
		parent: 'dosen',
		controller: 'dosen.addpengusulan.controller',
		templateUrl: '../apps/views/dosen/tambah-pengusulan.html'
	});
});
