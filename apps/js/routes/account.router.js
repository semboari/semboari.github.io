angular.module('account.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/account/login');
	$stateProvider
		.state('account', {
			url: '/account',
			templateUrl: '../apps/views/accounts/account.html'
		})
		.state('login', {
			url: '/login',
			parent: 'account',
			controller: 'LoginController',
			templateUrl: '../apps/views/accounts/sign-in.html'
		})
		.state('register', {
			url: '/register',
			parent: 'account',
			templateUrl: '../apps/views/accounts/sign-up.html'
		})
		.state('home', {
			url: '/home',
			parent: 'account',
			templateUrl: '../apps/views/accounts/home.html'
		})
		.state('about', {
			url: '/about',
			parent: 'account',
			templateUrl: '../apps/views/accounts/about.html'
		});
});
