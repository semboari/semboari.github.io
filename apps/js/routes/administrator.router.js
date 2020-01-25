angular.module('administrator.router', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('administrator', {
			url: '/administrator',
			controller: 'administrator.controller',
			templateUrl: '../apps/views/administrator/menu-admin.html'
		})
		.state('administrator-home', {
			url: '/home',
			parent: 'administrator',
			controller: 'administrator.home.controller',
			templateUrl: '../apps/views/administrator/home.html'
		})
		.state('administrator-dosen', {
			url: '/dosen',
			parent: 'administrator',
			controller: 'administrator.dosen.controller',
			templateUrl: '../apps/views/administrator/dosen.html'
		})

		.state('administrator-fakultas', {
			url: '/fakultas',
			parent: 'administrator',
			controller: 'administrator.fakultas.controller',
			templateUrl: '../apps/views/administrator/fakultas.html'
		})

		.state('administrator-progdi', {
			url: '/progdi',
			parent: 'administrator',
			controller: 'administrator.progdi.controller',
			templateUrl: '../apps/views/administrator/progdi.html'
		})

	;

});