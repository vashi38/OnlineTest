var app = angular.module("myApp");
app.service("myDbServices",function($http, $state){
	
	this.getUser = function(){
		return $http({
			method:"GET",
			url:"test/is_valid.json",
		}).then(function(response){
			
			return response.data;
		});
		
	}
	
	this.getQuestions = function()
	{
		return $http({
			method:"GET",
			url:"test/gq.json"
		}).then(function(response){
			return response.data;
		});
		
	}
	this.updateDB= function(queNo,Score,Time,lf_details){
		$http({
			method:"POST",
			url:"test/update_database.php",
			data:{
				que_no:""+queNo,
				score:Score,
				time:Time,
				lf:lf_details
			}
		}).then(function(response){
			
			console.log(response.data);
		});
	}
	this.getScore = function(){
		return $http({
			method:"GET",
			url:"result/getScore.php",
		}).then(function(response){
			return response.data;
		});
	}
	this.loginService = function(uname,password){
		return $http({
			method:"GET",
			url:"login/login_1.json",
			data:{
				uname:uname,
				pwd:password
			}
		}).then(function(response){
			return response;
		});
	}
})
