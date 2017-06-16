'use strict'

angular.module('app').directive('appTab',[function () {
    return {
        restrict:'EA',
        replace:true,
        templateUrl:'../../view/template/tab.html',
        scope:{
            list:'=',
            tabClick:'&',
            defSelect:'='
        },
        link:function (scope) {
            scope.selectId = scope.defSelect
            scope.click = function(tab) {
                scope.selectId = tab.id;
                scope.tabClick(tab);
            };
        }
    }
}])
