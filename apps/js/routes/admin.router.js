angular.module('app.admin.router', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/admin/home');
	$stateProvider.state('admin', {
		url: '/admin',
		templateUrl: '../apps/views/admin/menu-admin.html'
	})

	$stateProvider.state('admin-home', {
		url: '/home',
		parent: 'admin',
		templateUrl: '../apps/views/admin/home.html'
	})

	$stateProvider.state('admin-universitas', {
		url: '/universitas',
		parent: 'admin',
		controller: 'universitasController',
		templateUrl: '../apps/views/admin/universitas.html'
	})

	$stateProvider.state('admin-fakultas', {

		url: '/fakultas',
		parent: 'admin',
		controller: 'fakultasController',
		templateUrl: '../apps/views/admin/fakultas.html'
	})

	$stateProvider.state('admin-progdi', {

		url: '/progdi',
		parent: 'admin',
		templateUrl: '../apps/views/admin/progdi.html'
	})


	;
});