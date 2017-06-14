'use strict'
angular.module('app').directive('appPositionInfo', [function () {
    return{
        restrict:"EA",
        replace:true,
        templateUrl:'../../view/template/positionInfo.html',
        scope:{
          isActive: '=',
          isLogin:'=',
          pos:'='
        }
    }
}])