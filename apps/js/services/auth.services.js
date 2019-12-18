angular.module("auth.service", [])

    .factory("AuthService", AuthService)


    ;




function AuthService($http, $q, StorageService, $state, helperServices) {

    var service = {};

    return {
        login: login, logOff: logoff, userIsLogin: userIsLogin, getUserName: getUserName,
        userIsLogin: userIsLogin, userInRole: userInRole,
        getHeader: getHeader, url: service.url
    }

    function login(user) {
        var def = $q.defer();
        var a = helperServices.url;
        var b = getHeader();
        $http({
            method: 'Get',
            url: helperServices.url,
            headers: getHeader()
        }).then(res => {


         }, err => { 

            var user = {
                "IdUser": "2",
                "Username": "Kristt26",
                "Email": "kristt26@gmail.com",
                "Nama": "Candra Putra Wijaksana",
                "Role": "CustomerService",
                "Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIiLCJVc2VybmFtZSI6IktyaXN0dDI2IiwiRW1haWwiOiJrcmlzdHQyNkBnbWFpbC5jb20iLCJOYW1hIjoiQ2FuZHJhIFB1dHJhIFdpamFrc2FuYSIsIlJvbGUiOiJBZG1pbiIsInRpbWUiOjE1Njc5NTg0MjR9.D7k5f7QNrCgZvIBEy2jG3-F72IdbTDVfv0zACH4y7Lw"
            }
            StorageService.addObject("user", user);
    
            def.resolve(user);
    
         });
     

        return def.promise;


    }



    function getHeader() {

        try {
            if (userIsLogin()) {
                return {
                    'Content-Type': 'json/application',
                    'Authorization': 'Bearer ' + getToken()
                }
            }
            throw new Error("Not Found Token");
        } catch  {
            return {
                'Content-Type': 'json/application'
            }
        }
    }

    function logoff() {
        StorageService.clear();
        $state.go("login");

    }

    function getUserName() {
        if (userIsLogin) {
            var result = StorageService.getObject("user");
            return result.Username;
        }
    }

    function userIsLogin() {
        var result = StorageService.getObject("user");
        if (result) {
            return true;
        }
    }

    function userInRole(role) {
        var result = StorageService.getItem("user");
        if (result && result.roles.find(x => x.name = role)) {

            return true;
        }
    }



}