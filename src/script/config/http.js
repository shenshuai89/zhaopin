'use strict';
angular.module('app').config(['$provide', function($provide){
    // 装饰器主要用来修改默认服务的功能，给默认的服务增加一些功能
    $provide.decorator('$http', ['$delegate', '$q', function($delegate, $q){
        $delegate.post = function(url, data, config) {
            var def = $q.defer();
            $delegate.get(url).then(function(resp) {
                def.resolve(resp.data);
            },function (err) {
                def.reject(err);
            })

            return {
                then: function(scb, ecb){
                    def.promise.then(scb, ecb);
                }
            }
        }
        return $delegate;
    }]);
}]);
