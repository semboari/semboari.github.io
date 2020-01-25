angular
	.module('dosen.controller', [])
	.controller('dosen.controller', DosenController)
	.controller('dosen.home.controller', HomeController)
	.controller('dosen.pengusulan.controller', PengusulanController)
	.controller('dosen.profile.controller', ProfileController)
	.controller('dosen.addpengusulan.controller', AddPengusulanController);

function DosenController($scope, AuthService, PenilaianService) {
	AuthService.Init([ 'dosen' ]);
}

function ProfileController($scope, AuthService) {
	AuthService.profile().then((x) => {
		$scope.Profile = x;
	});
}
function HomeController($scope, AuthService, PenilaianService, JabatanService, message, $http, helperServices) {
	$scope.datas = [];
	$scope.tanggal = new Date();
	AuthService.profile().then((x) => {
		var iddosen = x.iddosen;
		$scope.Profile = x;

		PenilaianService.rekapitulasi($scope.Profile.iddosen).then((x) => {
			$scope.datas = x.data;
			$scope.total = $scope.datas.reduce((total, item) => {
				return total + item.total;
			}, 0);

			JabatanService.get().then((x) => {
				x.forEach((element) => {
					element.nilai = element.ak - $scope.total;
					if (element.nilai <= 0) {
						element.nilai = 'Cukup';
					}
				});
				$scope.Jabatans = x;
			});
		});
	});
	$scope.angkatohuruf = function(data) {
		switch (data) {
			case 1:
				return 'A';
			case 2:
				return 'B';
			case 3:
				return 'C';
			case 4:
				return 'D';
			case 5:
				return 'E';
			case 6:
				return 'F';
			default:
				return 'G';
		}
	};
}
function PengusulanController(
	$scope,
	AuthService,
	PenilaianService,
	PeraturanService,
	UnsurService,
	ProgdiService,
	SubUnsurService
) {
	$scope.datas = [];
	AuthService.profile().then((x) => {
		var iddosen = x.iddosen;
		$scope.Profile = x;
		PenilaianService.get(iddosen).then((x) => {
			$scope.datas = x;
			PeraturanService.get().then((x) => {
				var peraturans = x.sort((x, y) => y.idperaturan - x.idperaturan);
				$scope.Peraturan = peraturans[0];
				UnsurService.get().then((x) => {
					$scope.Unsurs = x;
					SubUnsurService.get($scope.Peraturan.idperaturan).then((x) => {
						$scope.SubUnsurs = x;
						ProgdiService.getKaprodi($scope.Profile.idprogramstudi).then((x) => {
							$scope.Kaprodi = x;
						});
					});
				});
			});
		});
	});

	$scope.changeSubUnsur = function() {
		$scope.error = true;
	};

	$scope.changeAk = function(model) {
		if ($scope.SubUnsurSelected) model.akview = $scope.SubUnsurSelected.ak * model.jumlahkegiatan;
	};

	$scope.selectTypeAhead = function(model, subunsur) {
		$scope.SubUnsurSelected = subunsur;
		model.idsubunsur = subunsur.idsubunsur;
		model.akview = model.jumlahkegiatan * subunsur.ak;
		$scope.Unsur = $scope.Unsurs.find((x) => x.idunsur == subunsur.idunsur);
		$scope.error = false;
	};

	$scope.SelectItem = function(data) {
		$scope.model = angular.copy(data);
		$scope.model.tanggal = new Date($scope.model.tanggal);
		var unsur = $scope.SubUnsurs.find((x) => x.idsubunsur == data.idsubunsur);
		$scope.Unsur = $scope.Unsurs.find((x) => x.idunsur == unsur.idunsur);
	};

	$scope.save = function(data) {
		if (data.idpenilaian == undefined) {
			data.iddosen = $scope.Profile.iddosen;
			data.tahun = $scope.Peraturan.tahun;
			data.namaunsur = $scope.Unsur.nama;
			PenilaianService.post(data).then((x) => {}, (err) => {});
		} else {
			PenilaianService.put(data).then((x) => {}, (err) => {});
		}
	};

	$scope.SelectUnsur = function() {};
}
function AddPengusulanController($scope, PenilaianService) {}
