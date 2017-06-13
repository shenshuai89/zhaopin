'use strict'
angular.module('app').directive('appHeadBar',[function () {
    return {
        restrict:'EA',
        replace:true,
        templateUrl:'../../view/template/headBar.html',
        scope:{
            text:'@'
        },
        link:function (scope) {
            scope.back = function () {
                window.history.back()
            }
        }
    }
}])