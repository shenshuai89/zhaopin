'use strict'
angular.module('app').directive('appCompany', [function () {
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'../../view/template/company.html'
    }
}])