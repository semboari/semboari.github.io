angular.module('app.dosen.router', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('dosen', {
		url: '/dosen',
		templateUrl: '../apps/views/dosen/menu-dosen.html'
	})

	$stateProvider.state('dosen-home', {
		url: '/home',
		parent: 'dosen',
		templateUrl: '../apps/views/dosen/home.html'
	})

	$stateProvider.state('dosen-pengusulan', {
		url: '/pengusulan',
		parent: 'dosen',
		templateUrl: '../apps/views/dosen/pengusulan.html'
	})

	$stateProvider.state('dosen-tambah-pengusulan', {
		url: '/tambah-pengusulan',
		parent: 'dosen',
		templateUrl: '../apps/views/dosen/tambah-pengusulan.html'
	})


	;
});