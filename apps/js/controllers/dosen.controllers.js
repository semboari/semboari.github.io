angular
	.module('dosen.controller', [])
	.controller('dosen.controller', DosenController)
	.controller('dosen.home.controller', HomeController)
	.controller('dosen.pengusulan.controller', PengusulanController)
	.controller('dosen.addpengusulan.controller', AddPengusulanController);

function DosenController($scope, AuthService, PenilaianService) {
	AuthService.Init([ 'dosen' ]);
}
function HomeController($scope, AuthService, PenilaianService) {
	$scope.datas = [];
	$scope.tanggal = new Date();
	AuthService.profile().then((x) => {
		var iddosen = x.iddosen;
		$scope.Profile = x;
		PenilaianService.get(iddosen).then((x) => {
			$scope.datas = x;

			$scope.total = $scope.datas.reduce((total, item) => {
				return total + item.akview;
			}, 0);
		});
	});
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
