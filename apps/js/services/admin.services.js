angular.module('admin.service', [])

    .factory("UniversitasService", UniversitasService)
    .factory("FakultasService", FakultasService)
    .factory("ProgdiService", ProgdiService)

;

function UniversitasService($http, $q, helperService, message) {
    var instance = false;
    var data = [{
        Id: 1,
        Universitas: "Sains Dan Teknologi Jayapura",
        Fakultas: [{
            iduniversitas: 1,
            idfakultas: 1,
            nama: "Ilmu Kumputer dan Manajemen",
            ProgramStudi: [{
                    idfakultas: 1,
                    idprogdi: 1,
                    nama: "Teknik Informatika"
                },
                {
                    idfakultas: 1,
                    idprogdi: 2,
                    nama: "Sistem Infomrasi"
                },
            ]
        }],

    }, {
        Id: 2,
        Universitas: "UNCEN",
        Fakultas: [{
            iduniversitas: 2,
            idfakultas: 3,
            nama: "Hukum",
            ProgramStudi: [{
                    idfakultas: 3,
                    idprogdi: 5,
                    nama: "Pajak"
                },
                {
                    idfakultas: 3,
                    idprogdi: 6,
                    nama: "International"
                },
            ]
        }],

    }]

    function get() {
        var defer = $q.defer();
        if (instance) {
            defer.resolve(data);
        } else {

            $http({
                url: helperService.url + "Universitas",
                methode: 'get'
            }).then(x => {
                data = x.data;
            }, err => {
                message.error("err.message");
            });

        }


        return defer.promise;
    }

    function getById(id) {
        var defer = $q.defer();
        if (instance) {
            var result = data.find(x => x.iduniversitas = id);

            defer.resolve(result);
        } else {

            $http({
                url: helperService.url + "Universitas/" + id,
                methode: 'get'
            }).then(x => {
                data = x.data;
            }, err => {
                message.error("err.message");
                defer.reject(err.message);
            });
        }
        return defer.promise;
    }

    function post(data) {
        var defer = $q.defer();
        $http({
            url: helperService.url + "Universitas",
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
            url: helperService.url + "Universitas/" + data.id,
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
            url: helperService.url + "Universitas/" + data.id,
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

function FakultasService($http, $q, helperService, message) {
    var instance = false;

    function get(universitasId) {
        var defer = $q.defer();
        $http({
            url: helperService.url + "Fakultas?universitasid=" + universitasId,
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
            url: helperService.url + "Fakultas/" + id,
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
            url: helperService.url + "Fakultas",
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
            url: helperService.url + "Fakultas/" + data.id,
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
            url: helperService.url + "Fakultas/" + data.id,
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


function ProgdiService($http, $q, helperService, message) {
    var instance = false;

    function get(fakultasId) {
        var defer = $q.defer();
        $http({
            url: helperService.url + "Progdi?fakultasId=" + fakultasId,
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
            url: helperService.url + "Progdi/" + id,
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
            url: helperService.url + "Progdi",
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
            url: helperService.url + "Progdi/" + data.id,
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
            url: helperService.url + "Progdi/" + data.id,
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