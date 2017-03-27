<?php 
header('Content-Type: text/html; charset=UTF-8');

error_reporting(0);
$conn = mysqli_connect('localhost','admin','admin'); 
$conn ->set_charset("utf8");

if (!$conn) { 
	die('Could not connect to MySQL: ' . mysqli_error()); 
} 
mysqli_select_db( $conn, 'plazas') or die('Could not select database.');
//mysqli_close($conn); 
?> 