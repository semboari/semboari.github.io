angular.module('admin.router', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('main	', {
		url: '/',
		parent: 'account',
		controller: 'LoginController',
		templateUrl: '../apps/views/accounts/sign-in.html'
	});
	$stateProvider.state('admin', {
		url: '/admin',
		templateUrl: '../apps/views/admin/menu-admin.html'
	});

	$stateProvider.state('admin-home', {
		url: '/home',
		parent: 'admin',
		templateUrl: '../apps/views/admin/home.html'
	});

	$stateProvider.state('admin-universitas', {
		url: '/universitas',
		parent: 'admin',
		controller: 'universitasController',
		templateUrl: '../apps/views/admin/universitas.html'
	});

	$stateProvider.state('admin-fakultas', {
		url: '/fakultas',
		parent: 'admin',
		controller: 'fakultasController',
		templateUrl: '../apps/views/admin/fakultas.html'
	});

	$stateProvider.state('admin-progdi', {
		url: '/progdi',
		parent: 'admin',
		controller: 'ProgdiController',
		templateUrl: '../apps/views/admin/progdi.html'
	});

	$stateProvider.state('admin-dosen', {
		url: '/dosen',
		parent: 'admin',
		templateUrl: '../apps/views/admin/dosen.html'
	});

	$stateProvider.state('admin-unsur', {
		url: '/unsur',
		parent: 'admin',
		templateUrl: '../apps/views/admin/unsur.html'
	});

	$stateProvider.state('admin-sub-unsur', {
		url: '/sub-unsur',
		parent: 'admin',
		templateUrl: '../apps/views/admin/sub-unsur.html'
	});

	$stateProvider.state('admin-tambah-sub-unsur', {
		url: '/tambah-sub-unsur',
		parent: 'admin',
		templateUrl: '../apps/views/admin/tambah-sub-unsur.html'
	});

	$stateProvider.state('admin-jabatan-fungsional', {
		url: '/jabatan-fungsional',
		parent: 'admin',
		templateUrl: '../apps/views/admin/jabatan-fungsional.html'
	});
});