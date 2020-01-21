angular
	.module('peneliti.controller', [])
	.controller('peneliti.controller', penelitiController)
	.controller('peneliti.home.controller', penelitiHomeController)
	.controller('peneliti.dosen.controller', penelitiDosenController)
	.controller('peneliti.pengusulan.controller', penelitiPengusulanController);

function penelitiController(AuthService) {}

function penelitiHomeController($scope, AuthService) {
	AuthService.profile().then((x) => {
		$scope.Profile = x;
	});
}

function penelitiDosenController($scope, AuthService, DosenService) {
	AuthService.profile().then((x) => {
		$scope.Profile = x;
		DosenService.getByProgdiId($scope.Profile.idprogramstudi).then((x) => {
			$scope.Dosens = x;
		});
	});
}

function penelitiPengusulanController($scope, PenilaianService, AuthService, DosenService, $stateParams) {
	$scope.dosen = $stateParams.Id;
	PenilaianService.get($scope.dosen.iddosen).then((x) => {
		$scope.datas = x;
	});

	$scope.verifikasi = function(data) {
		var item = angular.copy(data);
		if (item.accpeneliti === 1) {
			item.accpeneliti = 0;
		} else {
			item.accpeneliti = 1;
		}
		PenilaianService.put(item).then((x) => {
			data.accpeneliti = item.accpeneliti;
		});
	};
}
