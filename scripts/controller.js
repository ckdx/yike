/*
* @Author: ck
* @Date:   2018-07-11 09:39:50
* @Last Modified by:   ck
* @Last Modified time: 2018-07-11 19:37:52
*/
//创建一个独立的控制器模块，名字叫Controller
//该模块专门用于创建各个控制器
angular.module("Controller",[])
//创建navsCtrl控制器，给导航看绑定数据，模拟从后台获取
.controller("navsCtrl",["$scope",function($scope){
	$scope.navs=[
	{"href":"#/index","icon":"icon-home","text":"今日一刻"},
	{"href":"#/older","icon":"icon-file-empty","text":"往期内容"},
	{"href":"#/author","icon":"icon-pencil","text":"热门作者"},
	{"href":"#/category","icon":"icon-menu","text":"栏目浏览"},
	{"href":"#/favourite","icon":"icon-heart","text":"我的喜欢"},
	{"href":"#/settings","icon":"icon-cog","text":"设置"}
	];
}])
//修复路由器由锚点错误的bug
yike.config(["$locationProvider",function($locationProvider){
	$locationProvider.hashPrefix("");
}])
//创建indexCtrl控制器
.controller("indexCtrl",["$scope","$rootScope","$http","$filter",function($scope,$rootScope,$http,$filter){
	$rootScope.num = 0;//num值为0，第一个导航栏内容选中
	$rootScope.title="今日一刻";
	$rootScope.isShow=true;//加载图片刚开始的时候是处于显示状态
	// 获取当前时间 2018-7-11
	var today = new Date();
	var time=$filter("date")(today,"yyyy-M-d")
	// 发送请求，从服务器获取数据
	$http({
		url:"./api/index.php",
		params:{time:time}
	}).then(function(result){
		//success方法已经被淘汰，以后使用then方法
		console.log(result.data.posts);
		// 绑定数据传递给视图
		$scope.posts=result.data.posts;
		$rootScope.isShow=false;//加载数据完成，图片隐藏
	})
}])
.controller("olderCtrl",["$scope","$rootScope","$http","$filter",function($scope,$rootScope,$http,$filter){
	$rootScope.num = 1;//num值为1，第一个导航栏内容选中
	$rootScope.title="往期内容";
	$rootScope.isShow=true;
	// 获取当前时间 2018-7-11
	var today = new Date();
	var time=$filter("date")(today - 86400000,"yyyy-M-d")
	// 发送请求，从服务器获取数据
	$http({
		url:"./api/older.php",
		params:{time:time}
	}).then(function(result){
		//success方法已经被淘汰，以后使用then方法
		console.log(result.data.posts);
		// 绑定数据传递给视图
		$scope.posts=result.data.posts;
		$rootScope.isShow=false;
	})
}])
.controller("authorCtrl",["$scope","$rootScope","$http",function($scope,$rootScope,$http){
	$rootScope.num = 2;//num值为2，第一个导航栏内容选中
	$rootScope.title="热门作者";
	$rootScope.isShow=true;
	$http({
		url:"./api/author.php"
	}).then(function(result){
		console.log(result.data.authors);
		$scope.authors=result.data.authors;
		$rootScope.isShow=false;
	})
}])
.controller("categoryCtrl",["$scope","$rootScope","$http",function($scope,$rootScope,$http){
	$rootScope.num = 3;//num值为3，第一个导航栏内容选中
	$rootScope.title="栏目浏览"
}])