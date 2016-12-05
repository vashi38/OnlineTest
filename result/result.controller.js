var app=angular.module("myApp");

app.controller("resultController",function($scope,$state,$http,myDbServices){
	myDbServices.getUser().then(function(response){
		if(response=="false")
				$state.go('home');
		//else
		//	myDbServices.getScore().then(function(response){
		//		console.log(response);
		//		$scope.Score = response;
		//	});
	});
	
	
	
})