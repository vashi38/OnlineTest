<?php
session_start();
if(isset($_SESSION['userid']))
{
	$con=mysql_connect("localhost","root","");
	mysql_select_db("mydb",$con);
	$uname=	$_SESSION['userid'];
	if(!$con)
		echo 'Error!!';
	else
	{
		$postdata=file_get_contents("php://input");
		$request=json_decode($postdata);
	
		$que_no=$request->que_no;
		$time = $request->time;
		$score = $request->score;
		$lifeline = $request->lf;
		$flag = 3;
		if($time<0)
			$time = 0;
		if($que_no == '')
		{
			$sql_1="update user_pass set flag='$flag',time='$time',marks='$score' where username='$uname'";
			$res_1=mysql_query($sql_1,$con);
			echo 'In if'.$res_1;
		}
		else
		{
			$sql="select submitted from user_pass where username='$uname'";
			$res=mysql_query($sql,$con);
			while($row=mysql_fetch_array($res))
			{
				$submitted=$row['submitted'];
			}
			
			$submitted[$que_no]='1';
			$sql="update user_pass set submitted='$submitted',time='$time',marks='$score', lifeLines='$lifeline' where username='$uname'";
			$res=mysql_query($sql,$con);
			echo 'Success in else';
		}	
		echo 'outside';
	}
	mysql_close($con);
}
else
{	
	echo 'error due to user not found';

}
?>	