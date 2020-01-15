angular.module('message.service', []).factory('message', MessageServices);

function MessageServices(swangular, $q) {
	return { info: info, error: error, warning: warning, dialog: dialog };

	function info(params) {
		swangular.swal({
			title: 'Sukses',
			text: params,
			type: 'info'
		});
	}

	function error(params) {
		var title = 'Error';
		if (params.status) {
			switch (params.status) {
				case 401:
					title = 'Hak Akses';
					break;
				case 402:
					title = 'LINK';
					break;
				default:
					if (params.status > 0) title = params.status;
					break;
			}
		}

		var text = 'Terjadi Kesalahan';
		if (params.data) text = params.data.message;

		swangular.swal({
			title: title,
			text: text,
			type: 'error'
		});
	}

	function warning(params) {
		swangular.swal({
			title: 'Sukses',
			text: params,
			type: 'warning'
		});
	}

	function dialog(messageText, yesBtn, cancelBtn) {
		var def = $q.defer();
		var yesText = 'Ya';
		var cancelText = 'Batal';

		if (yesBtn) yesText = yesBtn;

		if (cancelBtn) cancelText = cancelBtn;

		swangular
			.swal({
				title: 'Yakin ?',
				text: messageText,
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: yesText,
				cancelButtonText: cancelText,
				reverseButtons: true
			})
			.then((result) => {
				if (result.value) {
					def.resolve(result.value);
				} else {
					def.reject(result.value);
				}
			});

		return def.promise;
	}
}
