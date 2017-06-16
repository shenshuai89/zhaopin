'use strict'
angular.module('app').directive('appPositionInfo', ['$http',function ($http) {
    return{
        restrict:"EA",
        replace:true,
        templateUrl:'../../view/template/positionInfo.html',
        scope:{
          isActive: '=',
          isLogin:'=',
          pos:'='
        },
        link:function (scope) {
            // scope.pos.select = scope.pos.select || false
            scope.$watch('pos', function (newVal) {
                if(newVal){
                    scope.pos  = scope.pos  || false
                    scope.isActive = scope.pos.select
                    scope.imagePath = scope.isActive? 'image/star-active.png' :'image/star.png'

                }

            })
            scope.favorite = function () {
                $http.post('data/favorite.json',{
                    id: scope.pos.id,
                    select: !scope.pos.select
                }).then(function (req) {
                    scope.isActive = !scope.isActive
                    scope.imagePath = scope.isActive?'image/star-active.png':'image/star.png'
                })
            }

        }
    }
}])