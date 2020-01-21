angular
	.module('rektor.controller', [])
	.controller('rektor.controller', rektorController)
	.controller('rektor.home.controller', rektorHomeController)
	.controller('rektor.dosen.controller', rektorDosenController)
	.controller('rektor.pengusulan.controller', rektorPengusulanController);

function rektorController(AuthService) {}

function rektorHomeController($scope, AuthService) {
	AuthService.profile().then((x) => {
		$scope.Profile = x;
	});
}

function rektorDosenController($scope, AuthService, DosenService) {
	AuthService.profile().then((x) => {
		$scope.Profile = x;
		DosenService.getByUniversitasId($scope.Profile.iduniversitas).then((x) => {
			$scope.Dosens = x;
		});
	});
}

function rektorPengusulanController($scope, PenilaianService, AuthService, DosenService, $stateParams) {
	$scope.dosen = $stateParams.Id;
	PenilaianService.get($scope.dosen.iddosen).then((x) => {
		$scope.datas = x;
	});

	$scope.verifikasi = function(data) {
		var item = angular.copy(data);
		if (item.accrektor === 1) {
			item.accrektor = 0;
		} else {
			item.accrektor = 1;
		}
		PenilaianService.put(item).then((x) => {
			data.accrektor = item.accrektor;
		});
	};
}
