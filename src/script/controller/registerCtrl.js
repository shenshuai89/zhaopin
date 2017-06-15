/**
 * Created by sam on 2017/6/13.
 */
'use strict';
angular.module('app').controller('registerCtrl', ['$scope', '$http', '$state', '$interval',function($scope, $http, $state, $interval){

    $scope.submit = function() {
        $http.post('data/regist.json',$scope.user).then(function(resp){
            $state.go('login');
        },function (err) {
            console.log(err)
        });
    };
    var count = 60;
    $scope.send = function() {
        $http.get('data/code.json').then(function(resp){
            if(1===resp.data.state) {
                count = 60;
                $scope.time = '60s';
                var interval = $interval(function() {
                    if(count<=0) {
                        $interval.cancel(interval);
                        $scope.time = '';
                    } else {
                        count--;
                        $scope.time = count + 's';
                    }
                }, 1000);
            }
        },function (err) {
            console.log(err)
        });
    }

}]);