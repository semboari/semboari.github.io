angular.module('app.kaprodi.router', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('kaprodi', {
		url: '/kaprodi',
		templateUrl: '../apps/views/kaprodi/menu-kaprodi.html'
	})

	$stateProvider.state('kaprodi-home', {
		url: '/home',
		parent: 'kaprodi',
		templateUrl: '../apps/views/kaprodi/home.html'
	})

	$stateProvider.state('kaprodi-pengusul', {
		url: '/pengusul',
		parent: 'kaprodi',
		templateUrl: '../apps/views/kaprodi/pengusul.html'
	})

	$stateProvider.state('kaprodi-berkas-pengusulan', {
		url: '/berkas-pengusulan',
		parent: 'kaprodi',
		templateUrl: '../apps/views/kaprodi/berkas-pengusulan.html'
	})

	;
});