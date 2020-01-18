angular
	.module('admin.controller', [])
	.controller('fakultasController', fakultasController)
	.controller('universitasController', universitasController)
	.controller('ProgdiController', progdiController);

function universitasController($scope, UniversitasService, message) {
	UniversitasService.get().then((result) => {
		$scope.Datas = result;
	});

	$scope.Save = function(data) {
		if (data.iduniversitas === undefined) {
			UniversitasService.post(data).then((result) => {
				message.info('Data Berhasil disimpan !');
				$scope.model = {};
			});
		} else {
			UniversitasService.put(data).then((result) => {
				var item = $scope.Datas.find((x) => x.iduniversitas == data.iduniversitas);
				if (item) {
					item.namauniversitas = result.namauniversitas;
				}
				message.info('Data Berhasil disimpan !');
				$scope.model = {};
			});
		}
	};

	$scope.SelectedItem = function(params) {
		$scope.model = angular.copy(params);
	};

	$scope.delete = function(params) {
		UniversitasService.delete(params).then((result) => {
			message.info('Data Berhasil dihapus !');
			$('#delete').modal('hide');
		});
	};
}

function fakultasController($scope, UniversitasService, FakultasService, message) {
	$scope.Datas = [];
	$scope.model = {};
	UniversitasService.get().then((x) => {
		$scope.Universitas = x;
	});

	$scope.Save = function(data, univ) {
		data.iduniversitas = univ.iduniversitas;
		if (data.idfakultas === undefined) {
			FakultasService.post(data).then((result) => {
				message.info('Data Berhasil disimpan !');
				$scope.Datas.push(result);
				$scope.model = {};
			});
		} else {
			FakultasService.put(data).then((result) => {
				var item = $scope.Datas.find((x) => x.idfakultas == data.idfakultas);
				if (item) {
					item.namafakultas = result.namafakultas;
				}
				message.info('Data Berhasil disimpan !');
				$scope.model = {};
			});
		}
	};

	$scope.SelectUniversitas = function(params) {
		$scope.Datas = [];
		setTimeout((x) => {
			FakultasService.getByParent(params.iduniversitas).then(
				(x) => {
					$scope.Datas = x;
				},
				(err) => {}
			);
		}, 100);
	};

	$scope.SelectItem = function(data) {
		$scope.model = angular.copy(data);
	};
	$scope.delete = function(params) {
		FakultasService.delete(params).then((result) => {
			var index = $scope.Datas.indexOf(params);
			$scope.Datas.splice(index, 1);
			message.info('Data Berhasil dihapus !');
			$('#delete').modal('hide');
		});
	};
}

function progdiController($scope, UniversitasService, FakultasService, ProgdiService, message) {
	UniversitasService.get().then((x) => {
		$scope.Universitas = x;
	});

	$scope.Save = function(data, univ, fak) {
		data.iduniversitas = univ.iduniversitas;
		data.idfakultas = fak.idfakultas;
		if (data.idporogramstudi === undefined) {
			ProgdiService.post(data).then((result) => {
				message.info('Data Berhasil disimpan !');
				result.namauniversitas = univ.namauniversitas;
				result.namafakultas = fak.namafakultas;
				$scope.Datas.push(result);
				$scope.model = {};
			});
		} else {
			ProgdiService.put(data).then((result) => {
				var item = $scope.Datas.find((x) => x.idporogramstudi == data.idporogramstudi);
				if (item) {
					item.namaprogramstudi = result.namaprogramstudi;
				}
				message.info('Data Berhasil disimpan !');
				$scope.model = {};
			});
		}
	};
	$scope.SelectUniversitas = function(params) {
		if (params) {
			FakultasService.getByParent(params.iduniversitas).then((result) => {
				$scope.Fakultas = result;
			});
		}
	};
	$scope.SelectFakultas = function(params) {
		if (params) {
			ProgdiService.getByParent(params.idfakultas).then(
				(x) => {
					$scope.Datas = x;
				},
				(err) => {}
			);
		}
	};

	$scope.SelectedItem = function(params) {
		$scope.model = angular.copy(params);
	};
	$scope.delete = function(params) {
		ProgdiService.delete(params).then((result) => {
			var index = $scope.Datas.indexOf(params);
			$scope.Datas.splice(index, 1);
			message.info('Data Berhasil dihapus !');
			$('#delete').modal('hide');
		});
	};
}
