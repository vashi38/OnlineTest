var app=angular.module("myApp");
app.controller("testController",function($timeout,$scope,$http,$window,$state,myDbServices){
	
	myDbServices.getUser().then(function(response){
		if(response=="false")
				$state.go('home');
	});
		
		
	$scope.Time=100;
	$scope.Score=0;
	$scope.actual_options=['a','b','c','d'];
	var multiplier = 1;
	var Que_no=-1;
	var submitted=0;
	var arr=[0];
	var myres;
	var all_data;
	$scope.flag=[0];
	$scope.select=[0];
	$scope.options=['a','b','c','d'];
	for(i=0;i<50;i++)
		$scope.select[i]=i;
	
	time_function = function(){
		$scope.Time-=1;
		if($scope.Time <= 0){
			update_database('');
			$state.go('result');
		}
		else
			$timeout(time_function,1000);
	}	

	check_submitted=function(){
	
		for(i=0;i<50;i++)
			if(myres[i].submitted=="1")
			{
				submitted++;
				arr[i]=1;
			}
			else
				arr[i]=0;
		
	}
	
	
	
	$scope.next=function(){
		Que_no++;
		if(myres[Que_no%50].submitted=="1")
		{
			$scope.next();
		}
		else
		{
			update_data();
			
		}
	};

	$scope.pre=function(){
	
		Que_no--;
		if(Que_no<0)
			Que_no=49;
		if(myres[Que_no%50].submitted=="1")
		{
			$scope.pre();
		}
		else
		{
			update_data();
		}
		
		
	}
	
	$scope.goto=function(no){
		Que_no=no;
		update_data();
	}
	
	update_data=function(){
		$scope.question=myres[Que_no%50].que;
		$scope.options[0]=myres[Que_no%50].a;
		$scope.options[1]=myres[Que_no%50].b;
		$scope.options[2]=myres[Que_no%50].c;
		$scope.options[3]=myres[Que_no%50].d;
		$scope.display_no=Que_no%50+1;
		$scope.option="";
	}
	
	$scope.update_queno=function(){
		for(j=0;j<50;j++)
			$scope.flag[j]=arr[j];
		
	}
	
	reset_all = function(){
		$scope.a = false;
		$scope.b = false;
		$scope.c = false;
		$scope.d = false;
		multiplier = 1;
		$scope.option_selected="";
	}
	
	$scope.submit=function(){
	
		if($scope.option_selected=="")
			alert("Please Select Option......");
		else
		{
			if($scope.option_selected == myres[Que_no%50].ans)
				$scope.Score+=2*multiplier;
			else
				$scope.Score-=1*multiplier;
			myres[Que_no%50].submitted="1";
			//update_database(Que_no%50);
			submitted++;
			console.log("selected option is ",$scope.option_selected);
			if(submitted==50)
				console.log("completed successfully");
			else
				$scope.next();
			
			reset_all();
		}
			
	}
	
	$scope.double_marks = function(){
		multiplier = 2;
		$scope.lf1 = true;
	}
	
	$scope.get_ans = function(){	
		$scope.option_selected = myres[Que_no%50].ans;
		$window.alert("Ans is "+myres[Que_no%50].ans);
		$scope.lf2 = true;
	}
	
	$scope.choose2 = function(){
		if(myres[Que_no%50].ans == 'a' || myres[Que_no%50].ans == 'c')
		{
			$scope.b = true;
			$scope.d = true;
		}
		else{
			$scope.a = true;
			$scope.c = true;
		}
		$scope.lf3 = true;
	}
	
	$scope.finish_test = function(){
		
		if($window.confirm("Are You Sure?")){
			update_database('');
			$state.go('result');
			console.log("You are Submitted the Test Successfully. Thank You.");
		}
	}
	
	update_database=function(q_no){
	
		check_submitted();
		var lf_details = get_lifeline_details();
		myDbServices.updateDB(q_no,$scope.Score,$scope.Time,lf_details);
		
	}
	
	update_lf = function(my_lf){
		$scope.lf1 = my_lf[0]=='0'?true:false;
		$scope.lf2 = my_lf[1]=='0'?true:false;
		$scope.lf3 = my_lf[2]=='0'?true:false;
		
	}
	
	myDbServices.getQuestions().then(function(all_data){
		myres=all_data.ques;
		if(all_data.flag == 3)
			$state.go('result');
		$scope.Time = all_data.time;
		$scope.Score = all_data.score;
		update_lf(all_data.lifeLine);
		check_submitted();
		$scope.next();
	});
	
	get_lifeline_details = function(){
		lf = "";
		lf+=$scope.lf1?'0':'1';
		lf+=$scope.lf2?'0':'1';
		lf+=$scope.lf3?'0':'1';
		return lf;
	}
	
	$timeout(time_function,1000);

});
