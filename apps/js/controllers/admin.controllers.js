angular
	.module('admin.controller', [])
	.controller('fakultasController', fakultasController)
	.controller('universitasController', universitasController1)
	.controller('ProgdiController', progdiController);

function universitasController1($scope, UniversitasService, message) {
	UniversitasService.get().then((result) => {
		$scope.Datas = result;
	});

	$scope.Save = function (data) {
		if (data.iduniversitas === undefined) {
			UniversitasService.post(data).then((result) => {
				message.info('Data Berhasil disimpan !');
			});
		} else {
			UniversitasService.put(data).then((result) => {
				var item = $scope.Datas.find((x) => x.iduniversitas == data.iduniversitas);
				if (item) {
					item.namauniversitas = result.namauniversitas;
				}
				message.info('Data Berhasil disimpan !');
			});
		}
	};

	$scope.SelectedItem = function (params) {
		$scope.model = angular.copy(params);
	};

	$scope.delete = function (params) {
		UniversitasService.delete(params).then((result) => {
			message.info('Data Berhasil dihapus !');
		});
	};
}

function fakultasController($scope, UniversitasService) {
	UniversitasService.get().then(x => {
		$scope.Universitas = x;
	})

	$scope.Datas = UniversitasService.get();

	$scope.Save = function (data) {
		if (data.Idfakultas === undefined) {
			FakultasService.post(data).then((result) => {
				message.info('Data Berhasil disimpan !');
			});
		} else {
			FakultasService.put(data).then((result) => {
				var item = $scope.Datas.find((x) => x.idfakultas == data.idfakultas);
				if (item) {
					item.namafakultas = result.namafakultas;
				}
				message.info('Data Berhasil disimpan !');
			});
		}
	};

	$scope.SelectUniversitas = function (params) {
		fakultasController.Service.getById(params.iduniversitas).then(result => {
			$scope.Datas = result;
		})
	}

	$scope.SelectedItem = function (params) {
		$scope.model = params;
	};
}

function progdiController($scope, UniversitasService) {
	UniversitasService.get().then(x => {
		$scope.Universitas = x;
	})

	$scope.Datas = UniversitasService.get();

	$scope.Save = function (data) {
		if (data.Id === undefined) $scope.Datas.push(data);
		else {}
	};

	$scope.SelectUniversitas = function (params) {
		progdiController.Service.getById(params.iduniversitas).then(result => {
			$scope.Datas = result;
		})
	}
	$scope.Select = function (params) {
		progdiController.Service.getById(params.idfakultas).then(result => {
			$scope.Datas = result;
		})
	}

	$scope.SelectedItem = function (params) {
		$scope.model = params;
	};
}