<?php
session_start();
if(isset($_SESSION['userid']))
{
	$uname=$_SESSION['userid'];
	$con=mysql_connect("localhost","root","");
	if(!$con)
		echo 'Error!!';
	else
	{
		$response = array();
		mysql_select_db("mydb",$con);
		$sql="select * from user_pass where username='$uname'";
		$submitted=array();
		
		$res=mysql_query($sql,$con);
		while($row=mysql_fetch_array($res)){
			$flag = $row['flag'];
			$submitted[0]=$row['submitted'];
			$lifeLine = $row['lifeLines'];
			$time = $row['time'];
			$score = $row['marks'];
		}
		$sql="select * from app"; 
		$res=mysql_query($sql,$con);
		$i=0;
		$ques=array();
		while($row=mysql_fetch_array($res))
		{
			$arr=array("que"=>$row['que'],
			"a"=>$row['a'],
			"b"=>$row['b'],
			"c"=>$row['c'],
			"d"=>$row['d'],
			"ans"=>$row['ans'],
			"submitted"=>$submitted[0][$i]);
			$ques[$i++]=$arr;
			if($i==50)
				break;
		}
		$response = array("ques"=>$ques,
						  "lifeLine"=>$lifeLine,
						  "time"=>$time,
						  "score"=>$score,
						  "flag"=>$flag);
		echo json_encode($response);
	}
	mysql_close($con);
}
?>