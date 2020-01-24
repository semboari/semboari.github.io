angular.module('administrator.router', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {


    $stateProvider.state('administrator', {
        url: '/administrator',
        templateUrl: '../apps/views/administrator/menu-admin.html'
    });

    $stateProvider.state('administrator-home', {
        url: '/home',
        parent: 'administrator',
        templateUrl: '../apps/views/administrator/home.html'
    });

    $stateProvider.state('administrator-fakultas', {
        url: '/fakultas',
        parent: 'administrator',
        // controller: 'fakultasController',
        templateUrl: '../apps/views/administrator/fakultas.html'
    });

    $stateProvider.state('administrator-progdi', {
        url: '/progdi',
        parent: 'administrator',
        // controller: 'progdiController',
        templateUrl: '../apps/views/administrator/progdi.html'
    });

    $stateProvider.state('administrator-dosen', {
        url: '/dosen',
        parent: 'administrator',
        // controller: 'dosenController',
        templateUrl: '../apps/views/administrator/dosen.html'
    });


});