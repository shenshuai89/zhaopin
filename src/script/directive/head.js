/**
 * Created by sam on 2017/6/13.
 */
'use strict'
angular.module('app').directive('appHead',[function () {
    return {
        restrict:'EA',
        replace:true,
        templateUrl:'../../view/template/head.html'
    }
}])