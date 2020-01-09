angular.module('app.kaprodi.router', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/kaprodi/home');
	$stateProvider.state('kaprodi', {
		url: '/kaprodi',
		templateUrl: '../apps/views/kaprodi/menu-kaprodi.html'
	})

	$stateProvider.state('kaprodi-home', {
		url: '/home',
		parent: 'kaprodi',
		templateUrl: '../apps/views/kaprodi/home.html'
	})

	;
});