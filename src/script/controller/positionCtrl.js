/**
 * Created by sam on 2017/6/13.
 */
'use strict'
angular.module('app').controller('positionCtrl',['$scope', '$http', '$state', '$q', function ($scope, $http, $state, $q) {
    $scope.isLogin = false
    function getPosition() {
        var def = $q.defer()
        $http.get('/data/position.json?id='+$state.params.id).then(function (res) {
            // console.log($state.params.id)
            res.data.forEach(function (obj, idx) {
                // console.log($state.params.id)
                // console.log(obj)
                if (obj.id == $state.params.id){
                    $scope.position = res.data[idx]
                    def.resolve(res)
                }
            })
        },function (err) {
            def.reject(err)
        })
        return def.promise
    }
    function getCompany(id) {
        $http.get('/data/company.json?id='+id).then(function (res) {
            // $scope.company = res.data[1]
            // console.log(res.data)
            res.data.forEach(function (obj,idx) {
                //console.log(obj)
                // console.log(idx)
                if(obj.id == id){
                    $scope.company = res.data[idx]
                }
            }) 

        })
    }
    getPosition().then(function (obj) {
        obj.data.forEach(function (obj, idx) {
                if (obj.id == $state.params.id){
                    getCompany(obj.companyId)
                }
            }
        )

    })
}])