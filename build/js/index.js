'use strict'

angular.module('app', ['ui.router','ngCookies','validation','ngAnimate'])
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
    }).state('login', {
        url:'/login',
        templateUrl:'view/login.html',
        controller:'loginCtrl'
    }).state('favorite', {
        url:'/favorite',
        templateUrl:'view/favorite.html',
        controller:'favoriteCtrl'
    }).state('me', {
        url:'/me',
        templateUrl:'view/me.html',
        controller:'meCtrl'
    }).state('post', {
        url:'/post',
        templateUrl:'view/post.html',
        controller:'postCtrl'
    }).state('register', {
        url:'/register',
        templateUrl:'view/register.html',
        controller:'registerCtrl'
    })
    $urlRouterProvider.otherwise('main');
}])
'use strict'
angular.module('app').config(['$validationProvider', function ($validationProvider) {
    var expression = {
        phone: /^1[\d]{10}$/,
        password: function(value) {
            var str = value + ''
            return str.length > 5;
        },
        required: function(value) {
            return !!value;
        }
    };
    var defaultMsg = {
        phone: {
            success: '',
            error: '必须是11位手机号'
        },
        password: {
            success: '',
            error: '长度至少6位'
        },
        required: {
            success: '',
            error: '不能为空'
        }
    };
    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
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
angular.module('app').controller('favoriteCtrl', ['$http', '$scope', function($http, $scope){

    $http.get('data/myFavorite.json').then(function(resp) {
        $scope.list = resp.data;
    });

}]);
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
'use strict';
angular.module('app').controller('meCtrl', ['$state', 'cache', '$http', '$scope', function($state, cache, $http, $scope){

    if(cache.get('name')) {
        $scope.name = cache.get('name');
        $scope.image = cache.get('image');
    }
    $scope.logout = function() {
        cache.remove('id');
        cache.remove('name');
        cache.remove('image');
        $state.go('main');
    };

}]);
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
/**
 * Created by sam on 2017/6/13.
 */
'use strict';
angular.module('app').controller('postCtrl', ['$scope', '$http',function($scope, $http){

    $scope.tabList = [{
        id: 'all',
        name: '全部'
    }, {
        id: 'pass',
        name: '面试邀请'
    }, {
        id: 'fail',
        name: '不合适'
    }]
    $scope.defSelect = 'all'

    $http.get('data/myPost.json').then(function(res){
        $scope.positionList = res.data;
    },function (err) {
        console.log(err)
    });

    $scope.filterObj = {};
    $scope.tClick = function(id, name) {
        switch (id) {
            case 'all':
                delete $scope.filterObj.state;
                break;
            case 'pass':
                $scope.filterObj.state = '1';
                break;
            case 'fail':
                $scope.filterObj.state = '-1';
                break;
            default:

        }
    }


}]);
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
'use strict'
angular.module('app').controller('searchCtrl', ['dict', '$scope', '$http', function (dict,$scope, $http) {
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
    $scope.defSelect = 'city'

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
                if(item.id === tabId) {
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
angular.module('app').directive('appHead',['cache',function (cache) {
    return {
        restrict:'EA',
        replace:true,
        templateUrl:'../../view/template/head.html',
        link:function (scope) {
            scope.name = cache.get('name') || ''
        }
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
'use strict'
angular.module('app').directive('appPositionList', ['$http',function ($http) {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionList.html',
        scope:{
            data:'=',
            filterObj:'=',
            isFavorite: '='
        },
        link:function (scope) {
            scope.select = function (item) {
                $http.post('data/favorite.json',{
                    id:item.id,
                    select: !item.select
                }).then(function (res) {
                    item.select = !item.select
                })
            }
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
            tabClick:'&',
            defSelect:'='
        },
        link:function (scope) {
            scope.selectId = scope.defSelect
            scope.click = function(tab) {
                scope.selectId = tab.id;
                scope.tabClick(tab);
            };
        }
    }
}])

'use strict'
angular.module('app').filter('filterByObj',[function () {
    return function (list, obj) {
        var result = []
        angular.forEach(list, function (item) {
            var isEqual = true
            for (var e in obj){
                if(item[e] !== obj[e]){
                    isEqual = false
                }
            }
            if (isEqual){
                result.push(item)
            }
        })
        return result;
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