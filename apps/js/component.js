angular
  .module("app.conponent", [])

  .component("userlogin", {
    controller: function ($scope, AuthService) {
      this.userName = AuthService.getUserName();
      $scope.logoff = function () {
        AuthService.logoff();
      }

    },
    template: `{{$ctrl.userName}}
    <span>| <a ng-click="logoff()">Log Off</a></span>
    `
  });
