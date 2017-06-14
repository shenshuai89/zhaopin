'use strict'
angular.module('app').controller('companyCtrl',['$scope', '$http', '$state',function ($scope, $http, $state) {
    $http.get('/data/company.json?id='+$state.params.id).then(function (res) {
        // console.log(res.data)
        res.data.forEach(function (obj, idx) {
            if (obj.id == $state.params.id){
                $scope.company = res.data[idx]
            }
        })
    },function (err) {
        console.log(err)
    })
}])