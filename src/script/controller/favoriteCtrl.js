/**
 * Created by sam on 2017/6/13.
 */
'use strict';
angular.module('app').controller('favoriteCtrl', ['$http', '$scope', function($http, $scope){

    $http.get('data/myFavorite.json').then(function(resp) {
        $scope.list = resp.data;
    });

}]);