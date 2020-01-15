angular.module('dosen.service', [])

    .factory("DosenService", DosenService)

;

function DosenService($http, $q, helperService, message) {
    var instance = false;

    function get() {
        var defer = $q.defer();
        $http({
            url: helperService.url + "Dosen",
            methode: 'get'
        }).then(x => {
            data = x.data;
            defer.resolve(x.data)
        }, err => {
            message.error("err.message");
            defer.reject(err);
        });

        return defer.promise;
    }

    function getById(id) {
        var defer = $q.defer();
        $http({
            url: helperService.url + "Dosen/" + id,
            methode: 'get'
        }).then(x => {
            data = x.data;
            defer.resolve(x.data)
        }, err => {
            message.error("err.message");
            defer.reject(err);
        });
        return defer.promise;
    }

    function post(data) {
        var defer = $q.defer();
        $http({
            url: helperService.url + "Dosen",
            methode: "post",
            data: data
        }).then(response => {
            defer.resolve(response.data);
            data.push(response.data);
        }, err => {
            message.error(err.message);
        });

        return defer.promise;
    }

    function put(data) {
        var defer = $q.defer();
        $http({
            url: helperService.url + "Dosen/" + data.id,
            methode: "put",
            data: data
        }).then(response => {
            defer.resolve(response.data);
        }, err => {
            message.error(err.message);
        });
        return defer.promise;
    }

    function deleteItem(data) {
        var defer = $q.defer();
        $http({
            url: helperService.url + "Dosen/" + data.id,
            methode: "delete",
        }).then(response => {
            var index = data.indexOf(data);
            data.splice(index, 1);
            defer.resolve(response.data);
        }, err => {
            message.error(err.message);
        });

        return defer.promise;
    }


    return {
        get: get,
        post: post,
        getById: getById,
        put: put,
        delete: deleteItem
    }

}