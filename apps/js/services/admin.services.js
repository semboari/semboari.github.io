angular.module('admin.service', [])

    .factory("UniversitasService", UniversitasService)

;

function UniversitasService() {
    var service = {};
    service.data = [{
        Id: 1,
        Universitas: "Sains Dan Teknologi Jayapura",
        Fakultas: "Ilmu Komputer Dan Manajemen",
        ProgramStudi: "SistemInfomrasi"

    }, {
        Id: 2,
        Universitas: "Sains Dan Teknologi Jayapura",
        Fakultas: "Ilmu Komputer Dan Manajemen",
        ProgramStudi: "Teknik Informatika"

    }, {
        Id: 3,
        Universitas: "Sains Dan Teknologi Jayapura",
        Fakultas: "Ilmu Komputer Dan Manajemen",
        ProgramStudi: "Teknik Informatika"

    }]

    function get() {
        return service.data;
    }


    return {
        get: get,
    }

}