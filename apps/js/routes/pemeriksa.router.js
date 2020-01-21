angular.module('pemeriksa.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('pemeriksa', {
		url: '/pemeriksa',
		controller: 'peneliti.controller',
		templateUrl: '../apps/views/pemeriksa/menu-pemeriksa.html'
	});

	$stateProvider.state('pemeriksa-home', {
		url: '/home',
		parent: 'pemeriksa',
		controller: 'peneliti.home.controller',
		templateUrl: '../apps/views/pemeriksa/home.html'
	});

	$stateProvider.state('pemeriksa-pengusul-penelitian', {
		url: '/pengusul-penelitian',
		parent: 'pemeriksa',

		controller: 'peneliti.dosen.controller',
		templateUrl: '../apps/views/pemeriksa/pengusul-penelitian.html'
	});

	$stateProvider.state('pemeriksa-berkas-pengusulan-penelitian', {
		url: '/berkas-pengusulan-penelitian/:{Id:json}',
		parent: 'pemeriksa',
		controller: 'peneliti.pengusulan.controller',
		templateUrl: '../apps/views/pemeriksa/berkas-pengusulan-penelitian.html'
	});
});
