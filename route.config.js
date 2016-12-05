var app=angular.module('myApp');
app.config(function($stateProvider, $urlRouterProvider){
	
	$stateProvider.
	state('home',{
		url:'/home',
		templateUrl:'login/login.html',
		controller:'loginController',
		controllerAs:'loginCtrl'
	})
	.state('register',{
		url:'/register',
		templateUrl:'register/register.html',
		controller:'registerController',
		controllerAs:'registerCtrl'
	})
	.state('test',{
		url:'/test',
		templateUrl:'test/test.html',
		controller:'testController',
		controllerAs:'testCtrl'
	})
	.state('result',{
		url:'/result',
		templateUrl:'result/result.html',
		controller:'resultController',
		controllerAs:'resultCtrl'
	});
	 $urlRouterProvider.otherwise('/home');
	
});