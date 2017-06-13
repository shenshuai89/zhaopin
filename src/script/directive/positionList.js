'use strict'
angular.module('app').directive('appPositionList', [function () {
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'../../view/template/positionList.html',
        scope:{
            data:'='
        }
    }
}])