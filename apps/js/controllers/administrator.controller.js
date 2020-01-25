angular
	.module('administrator.controller', [])
	.controller('administrator.controller', administratorController)
	.controller('administrator.home.controller', administratorHomeController)
	.controller('administrator.dosen.controller', administratorDosenController);

function administratorDosenController($scope, AuthService, PenilaianService) {
	AuthService.Init(['dosen']);
}

function administratorHomeController($scope, AuthService, PenilaianService) {
	AuthService.Init(['dosen']);
}

function administratorController($scope, AuthService, PenilaianService) {
	AuthService.Init(['dosen']);
}