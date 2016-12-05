<?php

session_start();
if(isset($_SESSION['userid']))
{
	$con=mysql_connect("localhost","root","");
	$uname=	$_SESSION['userid'];
	$score;
	if(!$con)
		echo 'Error!!';
	else
	{
		mysql_select_db("mydb",$con);
		$sql="select * from user_pass where username='$uname'";
		$res=mysql_query($sql,$con);
		while($row=mysql_fetch_array($res))
		{
			$score=$row['marks'];
		}
		
		echo $score;
	}
	mysql_close($con);
	session_destroy();
}
?>	
