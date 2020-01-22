angular
	.module('admin.controller', [])
	.controller('adminController', adminController)
	.controller('fakultasController', fakultasController)
	.controller('universitasController', universitasController)
	.controller('ProgdiController', progdiController)
	.controller('jabatanController', JabatanController)
	.controller('subUnsurController', subUnsurController)
	.controller('DosenController', DosenController)
	.controller('peraturanAndUnsurController', peraturanAndUnsurController);

function adminController(AuthService) {
	AuthService.Init([ 'admin' ]);
}

function universitasController($scope, AuthService, UniversitasService, message) {
	AuthService.Init([ 'admin' ]);
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

function fakultasController($scope, AuthService, UniversitasService, FakultasService, message) {
	AuthService.Init([ 'admin' ]);
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

function progdiController($scope, AuthService, UniversitasService, FakultasService, ProgdiService, message) {
	AuthService.Init([ 'admin' ]);
	UniversitasService.get().then((x) => {
		$scope.Universitas = x;
	});

	$scope.Save = function(data, univ, fak) {
		data.iduniversitas = univ.iduniversitas;
		data.idfakultas = fak.idfakultas;
		if (data.idprogramstudi === undefined) {
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

function peraturanAndUnsurController($scope, AuthService, PeraturanService, UnsurService, message) {
	AuthService.Init([ 'admin' ]);
	$scope.Peraturan = [];
	$scope.modelPeraturan = {};
	PeraturanService.get().then((x) => {
		$scope.Peraturan = x;
	});

	$scope.SavePeraturan = function(data, univ) {
		if (data.idperaturan === undefined) {
			PeraturanService.post(data).then((result) => {
				message.info('Data Berhasil disimpan !');
				$scope.modelPeraturan = {};
			});
		} else {
			PeraturanService.put(data).then((result) => {
				var item = $scope.Peraturan.find((x) => x.idperaturan == data.idperaturan);
				if (item) {
					item.tahun = result.tahun;
				}
				message.info('Data Berhasil disimpan !');
				$scope.modelPeraturan = {};
			});
		}
		$('#tahun').modal('hide');
	};

	$scope.SelectItemPeraturan = function(data) {
		$scope.modelPeraturan = angular.copy(data);
	};

	$scope.deletePeraturan = function(params) {
		message.dialog('Yakin Hapus Data Peraturan ?').then(
			(x) => {
				PeraturanService.delete(params).then((result) => {
					var index = $scope.Peraturan.indexOf(params);
					$scope.Peraturan.splice(index, 1);
					message.info('Data Berhasil dihapus !');
					$scope.modelPeraturan = {};
					$('#tahun').modal('hide');
				});
			},
			(err) => {}
		);
	};

	////UNUSUR
	$scope.Unsur = [];
	$scope.modelUnsur = {};
	UnsurService.get().then((x) => {
		$scope.Unsur = x;
	});

	$scope.SaveUnsur = function(data, univ) {
		if (data.idunsur === undefined) {
			UnsurService.post(data).then((result) => {
				message.info('Data Berhasil disimpan !');
				$scope.modelUnsur = {};
			});
		} else {
			UnsurService.put(data).then((result) => {
				var item = $scope.Unsur.find((x) => x.idunsur == data.idunsur);
				if (item) {
					item.nama = result.nama;
				}
				message.info('Data Berhasil disimpan !');
				$scope.modelUnsur = {};
			});
		}
		$('#unsur').modal('hide');
	};

	$scope.SelectItemUnsur = function(data) {
		$scope.modelUnsur = angular.copy(data);
	};

	$scope.deleteUnsur = function(params) {
		message.dialog('Yakin Hapus Data Unsur ?').then(
			(x) => {
				UnsurService.delete(params).then((result) => {
					var index = $scope.Unsur.indexOf(params);
					$scope.Unsur.splice(index, 1);
					message.info('Data Berhasil dihapus !');
					$scope.modelUnsur = {};
					$('#unsur').modal('hide');
				});
			},
			(err) => {}
		);
	};
}
function subUnsurController(
	$scope,
	AuthService,
	SubUnsurService,
	JabatanService,
	PeraturanService,
	UnsurService,
	message
) {
	AuthService.Init([ 'admin' ]);
	UnsurService.get().then((x) => {
		$scope.Unsurs = x;
		PeraturanService.get().then((x) => {
			$scope.Peraturans = x;
			JabatanService.get().then((x) => {
				$scope.Jabatans = x;
			});
		});
	});

	$scope.SelectPeraturan = function() {
		if ($scope.Peraturan) {
			SubUnsurService.get($scope.Peraturan.idperaturan).then((x) => {
				$scope.Datas = x;
			});
		}
	};

	$scope.SelectItem = function(item) {
		$scope.model = angular.copy(item);
		$scope.model.unsur = $scope.Unsurs.find((x) => x.idunsur == item.idunsur);
		$scope.model.jabatan = $scope.Jabatans.find((x) => x.idjabatan == item.idjabatan);
	};

	$scope.save = function(data) {
		if ($scope.Peraturan) {
			data.idtahunaturan = $scope.Peraturan.idperaturan;
		}
		data.tahun = $scope.Peraturan.tahun;
		data.namaunsur = data.unsur.nama;
		data.jabatan = data.jabatan;
		data.idunsur = data.unsur.idunsur;
		data.idjabatan = data.jabatan.idjabatan;
		data.namajabatan = data.jabatan.jabatan;

		if (data.idsubunsur === undefined) {
			SubUnsurService.post(data).then((x) => {
				message.info('data berhasil ditambah');
				$('#subunsur').modal('hide');
			});
		} else {
			SubUnsurService.put(data).then((x) => {
				var item = $scope.Datas.find((z) => z.idsubunsur == x.idsubunsur);
				if (item) {
					item.namaunsur = x.namaunsur;
					item.namasubunsur = x.namasubunsur;
					item.satuanhasil = x.satuanhasil;
					item.ak = x.ak;
					item.namajabatan = x.namajabatan;
				}

				message.info('data berhasil disimpan');
				$('#subunsur').modal('hide');
			});
		}
	};

	$scope.delete = function(params) {
		message.dialog('Yakin Hapus Data Jabatan ?').then(
			(x) => {
				SubUnsurService.delete(params).then((result) => {
					var index = $scope.Datas.indexOf(params);
					$scope.Datas.splice(index, 1);
					message.info('Data Berhasil dihapus !');
					$scope.model = {};
				});
			},
			(err) => {}
		);
	};
}

function JabatanController($scope, AuthService, JabatanService, message) {
	AuthService.Init([ 'admin' ]);
	$scope.Golongans = [ 'I', 'II', 'III', 'IV' ];
	$scope.Ruangs = [ 'a', 'b', 'c', 'd' ];
	JabatanService.get().then((result) => {
		$scope.Datas = result;
	});

	$scope.Save = function(data) {
		if (data.idjabatan === undefined) {
			JabatanService.post(data).then((result) => {
				message.info('Data Berhasil disimpan !');
				$scope.model = {};
			});
		} else {
			JabatanService.put(data).then((result) => {
				var item = $scope.Datas.find((x) => x.idjabatan == data.idjabatan);
				if (item) {
					item.jabatan = result.jabatan;
				}
				message.info('Data Berhasil disimpan !');
				$scope.model = {};
			});
		}
	};

	$scope.SelectItem = function(params) {
		$scope.model = angular.copy(params);
	};

	$scope.delete = function(params) {
		message.dialog('Yakin Hapus Data Jabatan ?').then(
			(x) => {
				JabatanService.delete(params).then((result) => {
					var index = $scope.Datas.indexOf(params);
					$scope.Datas.splice(index, 1);
					message.info('Data Berhasil dihapus !');
					$scope.model = {};
				});
			},
			(err) => {}
		);
	};
}

function DosenController($scope, AuthService, DosenService, UniversitasService, FakultasService, ProgdiService) {
	AuthService.Init([ 'admin' ]);
	DosenService.get().then((x) => {
		$scope.Datas = x;
		UniversitasService.get().then((x) => {
			$scope.Universitas = x;
		});
	});

	$scope.SelectUniversitas = function(params) {
		setTimeout((x) => {
			FakultasService.getByParent(params.iduniversitas).then(
				(x) => {
					$scope.Fakultas = x;
				},
				(err) => {}
			);
		}, 100);
	};
	$scope.SelectFakultas = function(params) {
		if (params) {
			ProgdiService.getByParent(params.idfakultas).then(
				(x) => {
					$scope.ProgramStudis = x;
				},
				(err) => {}
			);
		}
	};

	$scope.ChangeRole = function(data) {
		DosenService.changeRole(data).then((x) => {
			if (data.roles.lenght == 1)
				data.roles.push({
					rolename: data.newrole,
					deskripsi: data.newrole
				});
			else {
				data.roles = [
					{
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

	$scope.SelectDosen = function(item) {
		$scope.model = item;
	};
}
