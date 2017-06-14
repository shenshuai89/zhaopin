/**
 * Created by sam on 2017/6/13.
 */
'use strict';
angular.module('app').controller('mainCtrl', ['$scope', '$http', function($scope, $http){

    $http({
        url:'/data/positionList.json'
    }).then(function (res) {
        $scope.list = res.data
    })

}]);