angular.module('app.conponent', []).component('userlogin', {
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
});
