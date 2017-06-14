'use strict'

angular.module('app', ['ui.router','ngCookies'])
'use strict';
//定义全局变量
angular.module('app').value('dict', {}).run(['dict', '$http', function(dict, $http){
    $http.get('data/city.json').then(function(resp){
        dict.city = resp.data;
    });
    $http.get('data/salary.json').then(function(resp){
        dict.salary = resp.data;
    });
    $http.get('data/scale.json').then(function(resp){
        dict.scale = resp.data;
    });
}]);

/**
 * Created by sam on 2017/6/13.
 */
'use strict'
angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
        url:'/main',
        templateUrl:'view/main.html',
        controller:'mainCtrl'
    }).state('position', {
        url:'/position/:id',
        templateUrl :'view/position.html',
        controller:'positionCtrl'
    }).state('company', {
        url:'/company/:id',
        templateUrl:'view/company.html',
        controller:'companyCtrl'
    }).state('search', {
        url:'/search',
        templateUrl:'view/search.html',
        controller:'searchCtrl'
    })
    $urlRouterProvider.otherwise('main');
}])
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
'use strict'
angular.module('app').controller('searchCtrl', ['dict','$scope', '$http', function (dict,$scope, $http) {
    $scope.name=''
    $scope.tabList = [{
        id: 'city',
        name: '城市'
    }, {
        id: 'salary',
        name: '薪水'
    }, {
        id: 'scale',
        name: '公司规模'
    }]
    $scope.search = function() {
        $http.get('data/positionList.json?name='+$scope.name).then(function(res) {
            $scope.positionList = res.data;
        },function (err) {
            console.log(err)
        });
    };
    $scope.search();
    $scope.sheet = {};

    var tabId = '';
    $scope.tClick = function(id,name) {
        tabId = id;
        $scope.sheet.list = dict[id];
        $scope.sheet.visible = true;
    };

    $scope.filterObj = {};

    $scope.sClick = function(id,name) {
        if(id) {
            angular.forEach($scope.tabList, function(item){
                if(item.id===tabId) {
                    item.name = name;
                }
            });
            $scope.filterObj[tabId + 'Id'] = id;
        } else {
            delete $scope.filterObj[tabId + 'Id'];
            angular.forEach($scope.tabList, function(item){
                if(item.id===tabId) {
                    switch (item.id) {
                        case 'city':
                            item.name = '城市';
                            break;
                        case 'salary':
                            item.name = '薪水';
                            break;
                        case 'scale':
                            item.name = '公司规模';
                            break;
                        default:
                    }
                }
            });
        }
    }
    /*$http.get('/data/positionList.json').then(function (res) {
        $scope.positionList = res.data
    },function (err) {
        console.log(err)
    })*/
}])
'use strict'
angular.module('app').directive('appCompany', [function () {
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'../../view/template/company.html',
        scope:{
            com:'='
        }
    }
}])
/**
 * Created by sam on 2017/6/13.
 */
'use strict'
angular.module('app').directive('appFoot',[function () {
    return {
        restrict:'EA',
        replace:true,
        templateUrl:'../../view/template/foot.html'
    }
}])
/**
 * Created by sam on 2017/6/13.
 */
'use strict'
angular.module('app').directive('appHead',[function () {
    return {
        restrict:'EA',
        replace:true,
        templateUrl:'../../view/template/head.html'
    }
}])
'use strict'
angular.module('app').directive('appHeadBar',[function () {
    return {
        restrict:'EA',
        replace:true,
        templateUrl:'../../view/template/headBar.html',
        scope:{
            text:'@'
        },
        link:function (scope) {
            scope.back = function () {
                window.history.back()
            }
        }
    }
}])
'use strict'
angular.module('app').directive('appPositionClass', [function () {
    return {
        restrict:'EA',
        replace:true,
        templateUrl:'../../view/template/positionClass.html',
        scope:{
            com:'='
        },
        link:function (scope) {
            scope.showPositionList = function (idx) {
                scope.positionList = scope.com.positionClass[idx].positionList
                scope.isActive = idx
            }
            scope.$watch('com', function(newVal){
                if(newVal) scope.showPositionList(0);
            });
        }
    }
}])
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
'use strict'
angular.module('app').directive('appPositionList', [function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionList.html',
        scope:{
            data:'='
        }
    }
}])
'use strict';
angular.module('app').directive('appSheet', [function(){
    return {
        restrict: 'A',
        replace: true,
        scope: {
            list: '=',
            visible: '=',
            select: '&'
        },
        templateUrl: 'view/template/sheet.html'
    };
}]);

'use strict'

angular.module('app').directive('appTab',[function () {
    return {
        restrict:'EA',
        replace:true,
        templateUrl:'../../view/template/tab.html',
        scope:{
            list:'=',
            tabClick:'&'
        },
        link:function (scope) {
            scope.click = function(tab) {
                scope.selectId = tab.id;
                scope.tabClick(tab);
            };
        }
    }
}])

'use strict'
angular.module('app').service('cache',['$cookies', function ($cookies) {
    this.put = function(key, value){
        $cookies.put(key, value);
    };
    this.get = function(key) {
        return $cookies.get(key);
    };
    this.remove = function(key) {
        $cookies.remove(key);
    };
}])