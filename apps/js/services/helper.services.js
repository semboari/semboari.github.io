angular.module("helper.service",[])
.factory("helperServices",helperServices)
;



function helperServices (){
    var service={};
    service.url="http://localhost";

    return {url:service.url};
}