"use strict";angular.module("app",["ui.router","ngCookies","validation"]),angular.module("app").value("dict",{}).run(["dict","$http",function(t,e){e.get("data/city.json").then(function(e){t.city=e.data}),e.get("data/salary.json").then(function(e){t.salary=e.data}),e.get("data/scale.json").then(function(e){t.scale=e.data})}]),angular.module("app").config(["$provide",function(t){t.decorator("$http",["$delegate","$q",function(t,e){return t.post=function(n,a,o){var i=e.defer();return t.get(n).then(function(t){i.resolve(t.data)},function(t){i.reject(t)}),{then:function(t,e){i.promise.then(t,e)}}},t}])}]),angular.module("app").config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/position.html",controller:"positionCtrl"}).state("company",{url:"/company/:id",templateUrl:"view/company.html",controller:"companyCtrl"}).state("search",{url:"/search",templateUrl:"view/search.html",controller:"searchCtrl"}).state("login",{url:"/login",templateUrl:"view/login.html",controller:"loginCtrl"}).state("favorite",{url:"/favorite",templateUrl:"view/favorite.html",controller:"favoriteCtrl"}).state("me",{url:"/me",templateUrl:"view/me.html",controller:"meCtrl"}).state("post",{url:"/post",templateUrl:"view/post.html",controller:"postCtrl"}).state("register",{url:"/register",templateUrl:"view/register.html",controller:"registerCtrl"}),e.otherwise("main")}]),angular.module("app").config(["$validationProvider",function(t){var e={phone:/^1[\d]{10}$/,password:function(t){return(t+"").length>5},required:function(t){return!!t}},n={phone:{success:"",error:"必须是11位手机号"},password:{success:"",error:"长度至少6位"},required:{success:"",error:"不能为空"}};t.setExpression(e).setDefaultMsg(n)}]),angular.module("app").controller("companyCtrl",["$scope","$http","$state",function(t,e,n){e.get("/data/company.json?id="+n.params.id).then(function(e){e.data.forEach(function(a,o){a.id==n.params.id&&(t.company=e.data[o])})},function(t){console.log(t)})}]),angular.module("app").controller("favoriteCtrl",["$http","$scope",function(t,e){t.get("data/myFavorite.json").then(function(t){e.list=t.data})}]),angular.module("app").controller("loginCtrl",["$scope","$http","$state","cache",function(t,e,n,a){t.submit=function(){e.post("data/login.json",t.user).then(function(t){a.put("id",t.id),a.put("name",t.name),a.put("image",t.image),n.go("main")},function(t){console.log(t)})}}]),angular.module("app").controller("mainCtrl",["$scope","$http",function(t,e){e({url:"/data/positionList.json"}).then(function(e){t.list=e.data})}]),angular.module("app").controller("meCtrl",["$state","cache","$http","$scope",function(t,e,n,a){e.get("name")&&(a.name=e.get("name"),a.image=e.get("image")),a.logout=function(){e.remove("id"),e.remove("name"),e.remove("image"),t.go("main")}}]),angular.module("app").controller("positionCtrl",["$scope","$http","$state","$q",function(t,e,n,a){function o(n){e.get("/data/company.json?id="+n).then(function(e){e.data.forEach(function(a,o){a.id==n&&(t.company=e.data[o])})})}t.isLogin=!1,function(){var o=a.defer();return e.get("/data/position.json?id="+n.params.id).then(function(e){e.data.forEach(function(a,i){a.id==n.params.id&&(t.position=e.data[i],o.resolve(e))})},function(t){o.reject(t)}),o.promise}().then(function(t){t.data.forEach(function(t,e){t.id==n.params.id&&o(t.companyId)})})}]),angular.module("app").controller("postCtrl",["$scope","$http",function(t,e){t.tabList=[{id:"all",name:"全部"},{id:"pass",name:"面试邀请"},{id:"fail",name:"不合适"}],t.defSelect={},e.get("data/myPost.json").then(function(e){t.positionList=e.data},function(t){console.log(t)}),t.filterObj={},t.tClick=function(e,n){switch(e){case"all":delete t.filterObj.state;break;case"pass":t.filterObj.state="1";break;case"fail":t.filterObj.state="-1"}}}]),angular.module("app").controller("registerCtrl",["$scope","$http","$state","$interval",function(t,e,n,a){t.submit=function(){e.post("data/regist.json",t.user).then(function(t){n.go("login")},function(t){console.log(t)})};var o=60;t.send=function(){e.get("data/code.json").then(function(e){if(1===e.data.state){o=60,t.time="60s";var n=a(function(){o<=0?(a.cancel(n),t.time=""):(o--,t.time=o+"s")},1e3)}},function(t){console.log(t)})}}]),angular.module("app").controller("searchCtrl",["dict","$scope","$http",function(t,e,n){e.name="",e.tabList=[{id:"city",name:"城市"},{id:"salary",name:"薪水"},{id:"scale",name:"公司规模"}],e.search=function(){n.get("data/positionList.json?name="+e.name).then(function(t){e.positionList=t.data},function(t){console.log(t)})},e.search(),e.sheet={};var a="";e.tClick=function(n,o){a=n,e.sheet.list=t[n],e.sheet.visible=!0},e.filterObj={},e.sClick=function(t,n){t?(angular.forEach(e.tabList,function(t){t.id===a&&(t.name=n)}),e.filterObj[a+"Id"]=t):(delete e.filterObj[a+"Id"],angular.forEach(e.tabList,function(t){if(t.id===a)switch(t.id){case"city":t.name="城市";break;case"salary":t.name="薪水";break;case"scale":t.name="公司规模"}}))}}]),angular.module("app").directive("appCompany",[function(){return{restrict:"EA",replace:!0,templateUrl:"../../view/template/company.html",scope:{com:"="}}}]),angular.module("app").directive("appFoot",[function(){return{restrict:"EA",replace:!0,templateUrl:"../../view/template/foot.html"}}]),angular.module("app").directive("appHead",[function(){return{restrict:"EA",replace:!0,templateUrl:"../../view/template/head.html"}}]),angular.module("app").directive("appHeadBar",[function(){return{restrict:"EA",replace:!0,templateUrl:"../../view/template/headBar.html",scope:{text:"@"},link:function(t){t.back=function(){window.history.back()}}}}]),angular.module("app").directive("appPositionClass",[function(){return{restrict:"EA",replace:!0,templateUrl:"../../view/template/positionClass.html",scope:{com:"="},link:function(t){t.showPositionList=function(e){t.positionList=t.com.positionClass[e].positionList,t.isActive=e},t.$watch("com",function(e){e&&t.showPositionList(0)})}}}]),angular.module("app").directive("appPositionInfo",[function(){return{restrict:"EA",replace:!0,templateUrl:"../../view/template/positionInfo.html",scope:{isActive:"=",isLogin:"=",pos:"="}}}]),angular.module("app").directive("appPositionList",["$http",function(t){return{restrict:"A",replace:!0,templateUrl:"view/template/positionList.html",scope:{data:"=",filterObj:"=",isFavorite:"="},link:function(e){e.select=function(e){t.post("data/favorite.json",{id:e.id,select:!e.select}).then(function(t){e.select=!e.select})}}}}]),angular.module("app").directive("appSheet",[function(){return{restrict:"A",replace:!0,scope:{list:"=",visible:"=",select:"&"},templateUrl:"view/template/sheet.html"}}]),angular.module("app").directive("appTab",[function(){return{restrict:"EA",replace:!0,templateUrl:"../../view/template/tab.html",scope:{list:"=",tabClick:"&",defSelect:"="},link:function(t){t.click=function(e){t.selectId=e.id,t.tabClick(e)}}}}]),angular.module("app").filter("filterByObj",[function(){return function(t,e){var n=[];return angular.forEach(t,function(t){var a=!0;for(var o in e)t[o]!==e[o]&&(a=!1);a&&n.push(t)}),n}}]),angular.module("app").service("cache",["$cookies",function(t){this.put=function(e,n){t.put(e,n)},this.get=function(e){return t.get(e)},this.remove=function(e){t.remove(e)}}]);