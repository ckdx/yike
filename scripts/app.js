/*
* @Author: ck
* @Date:   2018-07-10 15:59:23
* @Last Modified by:   ck
* @Last Modified time: 2018-07-11 17:17:57
*/
//创建app应用模块
//调用控制器模块，在依赖中写上控制器模块的名称
var yike = angular.module("yike",["Controller","ngRoute"]);
/*
run方法在模块创建完成之后会直接执行
 */
yike.run(["$rootScope",function($rootScope){
	//给头部a标签绑定单机事件，点击可以实现侧边导航栏的显示或隐藏
	//给collapse类定义值，通过这个值决定collapse是否有效
	$rootScope.collapsed=false;
	$rootScope.toggle=function(){
		$rootScope.collapsed= !$rootScope.collapsed;

	// 显示或隐藏导航栏标题的内容
	// 获取导航栏中所有的dd
	var dds=document.querySelectorAll("dd");
		// 遍历每一个dd给每一个dd修改样式实现隐藏显示的效果
		// 显示时候，translate的值为0，collapsed的值为true
		if($rootScope.collapsed){
			// 此时显示
			for(var i=0;i<dds.length;i++){
				dds[i].style.transitionDuration = (i + 1) * 0.15 + 's';
				dds[i].style.transitionProperty = 'all';
				dds[i].style.transitionDelay = '0.2s';
				dds[i].style.transitionTimingFunction = 'ease-out';
				dds[i].style.transform = 'translate(0)';
			}
		}else{
			for(var i=0;i<dds.length;i++){
				dds[i].style.transitionDuration = (dds.length - i + 1) * 0.05 + 's';
				dds[i].style.transitionProperty = 'all';
				dds[i].style.transitionDelay = '';
				dds[i].style.transitionTimingFunction = 'ease-out';
				dds[i].style.transform = 'translate(-100%)';
			}
		}
	}
}])


// 配置路由
yike.config(["$routeProvider",function($routeProvider){
	$routeProvider.when("/",{
		redirectTo:"/index"//跳转到index页面
	}).when("/index",{
		templateUrl:"./views/list.html",
		controller:"indexCtrl"
	}).when("/older",{
		templateUrl:"./older.html",
		controller:"olderCtrl"
	}).when("/author",{
		templateUrl:"./author.html",
		controller:"authorCtrl"
	}).when("/category",{
		templateUrl:"./category.html",
		controller:"categoryCtrl"
	})
}])