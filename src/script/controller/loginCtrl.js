/**
 * Created by sam on 2017/6/13.
 */
'use strict';
angular.module('app').controller('loginCtrl', ['$scope','$http','$state', 'cache',function($scope,$http,$state,cache){

    $scope.submit = function() {
        $http.post('data/login.json', $scope.user).then(function(resp){
            cache.put('id',resp.id);
            cache.put('name',resp.name);
            cache.put('image',resp.image);
            $state.go('main');
        },function (err) {
            console.log(err)
        });
    }

}]);