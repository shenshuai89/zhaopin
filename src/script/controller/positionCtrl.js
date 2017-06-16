/**
 * Created by sam on 2017/6/13.
 */
'use strict'
angular.module('app').controller('positionCtrl',['$scope', '$http', '$state', '$q', 'cache',function ($scope, $http, $state, $q,cache) {
    $scope.isLogin = !!cache.get('name')
    $scope.message = $scope.isLogin ? '投个流量':'quddd'

    function getPosition() {
        var def = $q.defer()
        $http.get('/data/position.json?id='+$state.params.id).then(function (res) {
            // console.log($state.params.id)
            angular.forEach(res.data,function (item,idx) {
                // console.log(item)
                if (item.id == $state.params.id){
                    $scope.position = res.data[idx]
                    // console.log(item)
                    if(item.posted){
                        $scope.message = '已投递'
                    }
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
            angular.forEach(res.data, function (item, idx) {
                if(item.id == id){
                    $scope.company = res.data[idx]
                }
            })
            /*res.data.forEach(function (obj,idx) {
                //console.log(obj)
                // console.log(idx)
                if(obj.id == id){
                    $scope.company = res.data[idx]
                }
            }) */

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
    
    $scope.go = function () {
        if ($scope.message !== '已投递'){
            if ($scope.isLogin){
                $http.post('data/handle.json',{
                    id:$scope.position.id
                }).then(function (req) {
                    console.log(req)
                    $scope.message = '已投递'
                })
            }else {
                $state.go('login')
            }
        }

    }
}])