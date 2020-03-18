<?php
//Script to search particular record from Database
$servername = "localhost";
$username = "read";
$password = "read";
$dbname = "accounts";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
//Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//search for record
$email= $_POST['email'];
trim($email);
if ($email === "") {
	$phone=$_POST['phone'];
	if ($phone === "") {
	echo "No Search Query entered";
	sleep(3);
	header('Location: updation.html');	
	}
	else{
		$sql = "SELECT name,email,phone,dob,height,weight FROM registration WHERE phone= '".$phone."'";
	$result= mysqli_query($conn,$sql);
	}
} 
else {
	$sql = "SELECT name,email,phone,dob,height,weight FROM registration WHERE email= '".$email."'";
	$result= mysqli_query($conn,$sql);
}
if($row=mysqli_fetch_array($result))
{
echo "name: " . $row["name"]. "<br>email: " . $row["email"]. "<br>phone: " . $row["phone"]. "<br>dob: ". $row["dob"]. "<br>height: ". $row["height"]. "<br>weight: ".$row["weight"];
}
else{
	echo "<br>No Record Found";
}


?>