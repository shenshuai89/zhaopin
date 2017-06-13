'use strict'

angular.module('app', ['ui.router'])
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
    })
    $urlRouterProvider.otherwise('main');
}])
'use strict'
angular.module('app').controller('companyCtrl',['$scope', function ($scope) {

}])
/**
 * Created by sam on 2017/6/13.
 */
'use strict';
angular.module('app').controller('mainCtrl', ['$scope', function($scope){

}]);
/**
 * Created by sam on 2017/6/13.
 */
'use strict'
angular.module('app').controller('positionCtrl',['$scope', function ($scope) {

}])
'use strict'
angular.module('app').directive('appCompany', [function () {
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'../../view/template/company.html'
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
angular.module('app').directive('positionInfo', function () {
    return{
        restrict:"EA",
        replace:true,
        templateUrl:'../../view/template/positionInfo.html',
        scope:{
          isActive: '='
        },
        link:function (scope) {
            $scope.imagePath = $scope.isActive ?'image/star-active.png':'image/star.png';
        }
    }
})
'use strict'
angular.module('app').directive('appPositionList', [function () {
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'../../view/template/positionList.html',
        scope:{
            data:'='
        }
    }
}])