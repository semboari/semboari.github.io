angular
	.module('app.conponent', [])
	.component('userlogin', {
		controller: function($scope, AuthService) {
			this.userName = AuthService.getUserName();
			$scope.logoff = function() {
				$('#logout').modal('hide');
				AuthService.logOff();
			};
		},
		template: `<a class="nav-link" data-toggle="modal" data-target="#logout">Logout</a>
	<div class="modal fade" id="logout" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Logout</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class=" text-uppercase">Apakah Anda Yakin Ingin Keluar ?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button ng-click="logoff()" type="button" class="btn btn-primary">Ok</button>
            </div>
        </div>
    </div>
</div>`
	})
	.component('profile', {
		controller: function($scope, AuthService) {},
		template: `<a class="nav-link" ui-sref="dosen-home">Profile</a>`
	})
	.component('changepassword', {
		controller: function($scope, AuthService, message) {
			$scope.changepassword = function(model) {
				if (model.newpassword !== model.confirmpassword) {
					message.errorText('Password Baru dan Konfirmasi Password Tidak Sama');
				} else {
					AuthService.changepassword(model).then(
						(x) => {
							$scope.model = {};
							$('#changepasswordmodal').modal('hide');
						},
						(err) => {
							message.errorText(err.data.message);
						}
					);
				}
			};
		},
		template: `<button class="btn btn-outline-primary" data-toggle="modal" data-target="#changepasswordmodal">Ubah
        Password</span></button>

        <div class="modal fade" id="changepasswordmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
	aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">SIPAK</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<form class="form-group" ng-submit="changepassword(model)">
				<div class="modal-body">

					<div class="form-group">
						<label class="control-label">Password Lama</label>
						<input class="form-control" ng-model="model.oldpassword" type="password"
							placeholder="Password Lama" required="">
					</div>

					<div class="form-group">
						<label class="control-label">Password</label>
						<input class="form-control" ng-model="model.newpassword" type="password"
							placeholder="Masukan Password Anda" required="">
					</div>
					<div class="form-group">
						<label class="control-label">Password Lama</label>
						<input class="form-control" ng-model="model.confirmpassword" type="password"
							placeholder="Konfirmasi Password" required="">
					</div>


				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">
						<span class="fas fa-close"></span> Cancel
					</button>
					<button type="submit" class="btn btn-primary">
						<span class="fas fa-edit"></span> Change
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
`
	});
