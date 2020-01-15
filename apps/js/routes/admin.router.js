angular.module('app.admin.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/account/login');
	$stateProvider
		.state('admin', {
			url: '/admin',
			templateUrl: '../apps/views/admin/menu-admin.html'
		})
		.state('pejabat', {
			url: '/pejabat',
			parent: 'admin',
			templateUrl: '../apps/views/admin/pejabat.html'
		});
});
