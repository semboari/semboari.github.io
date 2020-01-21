angular
	.module('kaprodi.controller', [])
	.controller('kaprodi.controller', KaprodiController)
	.controller('kaprodi.home.controller', KaprodiHomeController)
	.controller('kaprodi.dosen.controller', KaprodiDosenController)
	.controller('kaprodi.pengusulan.controller', KaprodiPengusulanController);

function KaprodiController(AuthService) {}

function KaprodiHomeController($scope, AuthService) {
	AuthService.profile().then((x) => {
		$scope.Profile = x;
	});
}

function KaprodiDosenController($scope, AuthService, DosenService) {
	AuthService.profile().then((x) => {
		$scope.Profile = x;
		DosenService.getByProgdiId($scope.Profile.idprogramstudi).then((x) => {
			$scope.Dosens = x;
		});
	});
}

function KaprodiPengusulanController($scope, PenilaianService, AuthService, DosenService, $stateParams) {
	$scope.dosen = $stateParams.Id;
	PenilaianService.get($scope.dosen.iddosen).then((x) => {
		$scope.datas = x;
	});

	$scope.verifikasi = function(data) {
		var item = angular.copy(data);
		if (item.acckaprodi === 1) {
			item.acckaprodi = 0;
		} else {
			item.acckaprodi = 1;
		}
		PenilaianService.put(item).then((x) => {
			data.acckaprodi = item.acckaprodi;
		});
	};
}
