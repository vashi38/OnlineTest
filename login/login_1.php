<?php

	$con=mysql_connect("localhost","root","");
	if(!$con)
		echo 'Error!!';
	else
	{
		$postdata=file_get_contents("php://input");
		$request=json_decode($postdata);
	
		$uname=$request->uname;
		$pwd=$request->pwd;
		 $flg=0;
		mysql_select_db("mydb",$con);
		$sql="select * from user_pass where username='$uname' and password='$pwd'";
		$res=mysql_query($sql,$con);
		while($row=mysql_fetch_array($res))
		{
			if($row['flag']==0)
			{
				$flg=1;
				$sql="update user_pass set flag=1 where username='$uname'";
				mysql_query($sql,$con);
			}	
			else
				$flg=2;
			session_start();
			$_SESSION['userid']=$uname;
		}
		if($flg==0)
			echo "false";
		if($flg==1)
			echo "true";
		if($flg==2)
			echo "Submitted";
	}
	mysql_close($con);
	
?>