<?php
//Function to write data to database


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


//Prepare SQL statement
$sql= "SELECT * FROM registration";
$result= mysqli_query($conn,$sql);
    // output data of each row
    while($row = mysqli_fetch_array($result)) {
        echo "name: " . $row["name"]. "<br>email: " . $row["email"]. "<br>phone: " . $row["phone"]. "<br>dob: ". $row["dob"]. "<br>gender: ". $row["gender"]. "<br>height: ". $row["height"]. "<br>weight: ".$row["weight"]."<br>bmi: ".$row["bmi"]."<br>";
   }


$conn->close(); 
?>
