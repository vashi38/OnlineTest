var app=angular.module("myApp");
app.controller("registerController",function($scope,$http,$window,$state,myDbServices){
	myDbServices.getUser().then(function(response){
		if(response=="false")
			$state.go('home');
	});

	$scope.years=['First','Second','Third','Fourth'];
	$scope.error_info=false;
	$scope.submit=function(){
		console.log("form is submitted by ",$scope.fname);
			$state.go('test');
	};
});