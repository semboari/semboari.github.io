angular.module('admin.controller', [])
    .controller("fakultasController", fakultasController)
    .controller("universitasController", universitasController1);

function fakultasController($scope, UniversitasService) {
    $scope.Datas = UniversitasService.get();
}


function universitasController1($scope, UniversitasService) {
    $scope.Datas = UniversitasService.get();

    $scope.Save = function (data) {

        if (data.Id === undefined)
            $scope.Datas.push(data);
        else {

        }
    }

    $scope.SelectedItem = function (params) {
        $scope.model = params;
    }

    $scope.delete = function (params) {
        var index = $scope.Datas.indexOf(params);
        $scope.Datas.slice(index, 1);
    }
}