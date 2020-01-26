angular
	.module('administrator.controller', [])
	.controller('administrator.controller', administratorController)
	.controller('administrator.home.controller', administratorHomeController)
	.controller('administrator.dosen.controller', administratorDosenController);

function administratorHomeController($scope, AuthService, PenilaianService) {
	AuthService.Init(['administrator']);
}

function administratorController($scope, AuthService, PenilaianService) {
	AuthService.Init(['administrator']);
}

function administratorDosenController(
	$scope,
	AuthService,
	DosenService,
	JabatanService,
	FakultasService, message,
	ProgdiService
) {
	AuthService.Init(['administrator']);

	AuthService.profile().then((x) => {
		$scope.profile = x;
		DosenService.get().then((x) => {
			$scope.Datas = x;
			FakultasService.getByParent($scope.profile.iduniversitas).then(
				(x) => {
					$scope.Fakultas = x;
					JabatanService.get().then((x) => {
						$scope.Jabatans = x;
					});
				},
				(err) => {}
			);
		});
	});
	$scope.SelectFakultas = function (params) {
		if (params) {
			ProgdiService.getByParent(params.idfakultas).then(
				(x) => {
					$scope.ProgramStudis = x;
				},
				(err) => {}
			);
		}
	};

	$scope.ChangeRole = function (data) {
		DosenService.changeRole(data).then((x) => {
			if (data.roles.lenght == 1)
				data.roles.push({
					rolename: data.newrole,
					deskripsi: data.newrole
				});
			else {
				data.roles = [{
						rolename: 'dosen',
						deskripsi: 'Dosen'
					},
					{
						rolename: data.newrole,
						deskripsi: data.newrole
					}
				];
			}
		});
	};

	$scope.SelectItem = function (item) {
		$scope.model = item;
		$scope.model.tanggallahir = new Date(item.tanggallahir);
		$scope.model.Jabatan = $scope.Jabatans.find(x => x.idjabatan == item.idjabatan);
	};

	$scope.save = function (data) {
		data.idjabatan = data.Jabatan.idjabatan;
		if (data.iddosen == undefined) {
			data.idprogramstudi = $scope.progdi.idprogramstudi;
			AuthService.registerdosen(data).then((res) => {
				$("#addDosen").modal('hide');
				$scope.Datas.push(res);
			});
		} else {
			DosenService.put(data).then((res) => {
				$("#addDosen").modal('hide');
				message.info("Data Berhasil DiUbah");
			});
		}
	};

	$scope.delete = function (params) {
		DosenService.delete(params).then((result) => {
			var index = $scope.Datas.indexOf(params);
			$scope.Datas.splice(index, 1);
			message.info('Data Berhasil dihapus !');
			$('#delete').modal('hide');
		});
	};
}