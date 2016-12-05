var app=angular.module("myApp");
app.controller("loginController",function($http,$window,$scope,$state,myDbServices){
	$scope.iup=false;
		
	$scope.submit=function(){
		console.log("form is submitted by ",$scope.user.uname);
		
		 myDbServices.loginService($scope.user.uname,$scope.user.pwd).then(function(response){	
			if(response.data=="false")
				$scope.iup=true;
			else if(response.data=="true")
				$state.go('register');
			else
				$state.go('test');
		});
		
		
	};
});