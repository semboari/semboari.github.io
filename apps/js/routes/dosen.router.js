angular.module('app.dosen.router', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/dosen/home');
	$stateProvider.state('dosen', {
		url: '/dosen',
		templateUrl: '../apps/views/dosen/menu-dosen.html'
	})

	$stateProvider.state('dosen-home', {
		url: '/home',
		parent: 'dosen',
		templateUrl: '../apps/views/dosen/home.html'
	})

	$stateProvider.state('dosen-pendidikan', {
		url: '/pendidikan',
		parent: 'dosen',
		templateUrl: '../apps/views/dosen/pendidikan.html'
	})

	$stateProvider.state('dosen-penelitian', {
		url: '/penelitian',
		parent: 'dosen',
		templateUrl: '../apps/views/dosen/penelitian.html'
	})

	$stateProvider.state('dosen-pengabdian', {
		url: '/pengabdian',
		parent: 'dosen',
		templateUrl: '../apps/views/dosen/pengabdian.html'
	})

	$stateProvider.state('dosen-penunjang', {
		url: '/penunjang',
		parent: 'dosen',
		templateUrl: '../apps/views/dosen/penunjang.html'
	})

	$stateProvider.state('dosen-tambah-pendidikan', {
		url: '/tambah-pendidikan',
		parent: 'dosen',
		templateUrl: '../apps/views/dosen/tambah-pendidikan.html'
	})

	$stateProvider.state('dosen-tambah-penelitian', {
		url: '/tambah-penelitian',
		parent: 'dosen',
		templateUrl: '../apps/views/dosen/tambah-penelitian.html'
	})

	$stateProvider.state('dosen-tambah-pengabdian', {
		url: '/tambah-pengabdian',
		parent: 'dosen',
		templateUrl: '../apps/views/dosen/tambah-pengabdian.html'
	})

	$stateProvider.state('dosen-tambah-penunjang', {
		url: '/tambah-penunjang',
		parent: 'dosen',
		templateUrl: '../apps/views/dosen/tambah-penunjang.html'
	})


	;
});