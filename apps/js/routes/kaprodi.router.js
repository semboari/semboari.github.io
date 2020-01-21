angular.module('kaprodi.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('kaprodi', {
		url: '/kaprodi',
		controller: 'kaprodi.controller',
		templateUrl: '../apps/views/kaprodi/menu-kaprodi.html'
	});

	$stateProvider.state('kaprodi-home', {
		url: '/home',
		parent: 'kaprodi',
		controller: 'kaprodi.home.controller',
		templateUrl: '../apps/views/kaprodi/home.html'
	});

	$stateProvider.state('kaprodi-pengusul', {
		url: '/pengusul',
		parent: 'kaprodi',
		controller: 'kaprodi.dosen.controller',
		templateUrl: '../apps/views/kaprodi/pengusul.html'
	});

	$stateProvider.state('kaprodi-berkas-pengusulan', {
		url: '/berkas-pengusulan/:{Id:json}',
		parent: 'kaprodi',
		controller: 'kaprodi.pengusulan.controller',
		templateUrl: '../apps/views/kaprodi/berkas-pengusulan.html'
	});
});
