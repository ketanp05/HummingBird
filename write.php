<?php
//Function to write data to database
$servername = "localhost";
$username = "write";
$password = "write";
$dbname = "accounts";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
//Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name= $_POST["name"];
$email= $_POST["email"];
$password= $_POST["password"];
$phone= $_POST["phone"];
$dob= $_POST["dob"];
$gender= $_POST["gender"];
$height= $_POST["height"];
$weight= $_POST["weight"];
$bmi= ($weight/($height * $height))*10000;
//Prepare SQL statement
$sql= "INSERT INTO registration(name,email,phone,dob,gender,height,weight,bmi) VALUES ('".$name."','".$email."',".$phone.",'".$dob."','".$gender."',".$height.",".$weight.",".$bmi.")";
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$sql= "INSERT INTO login(email,password) VALUES ('".$email."','".$password."')";
if ($conn->query($sql) === TRUE) {
    echo "Password entered successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close(); 
?>
