angular.module('app.pemeriksa.router', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('pemeriksa', {
		url: '/pemeriksa',
		templateUrl: '../apps/views/pemeriksa/menu-pemeriksa.html'
	})

	$stateProvider.state('pemeriksa-home', {
		url: '/home',
		parent: 'pemeriksa',
		templateUrl: '../apps/views/pemeriksa/home.html'
	})

	$stateProvider.state('pemeriksa-pengusul-penelitian', {
		url: '/pengusul-penelitian',
		parent: 'pemeriksa',
		templateUrl: '../apps/views/pemeriksa/pengusul-penelitian.html'
	})

	$stateProvider.state('pemeriksa-berkas-pengusulan-penelitian', {
		url: '/berkas-pengusulan-penelitian',
		parent: 'pemeriksa',
		templateUrl: '../apps/views/pemeriksa/berkas-pengusulan-penelitian.html'
	})

	;
});