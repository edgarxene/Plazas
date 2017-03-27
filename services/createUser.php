<?php 
require_once("config.php");

include '../ChromePhp.php';
ChromePhp::log('Hello console!');

$rfc	= $_REQUEST["rfc"];
$nombre	= $_REQUEST["nombre"];
$curp		= $_REQUEST["curp"];
$cvepre		= $_REQUEST["cvepre"];
$desde		= $_REQUEST["desde"];
$hasta		= $_REQUEST["hasta"];
$movimiento		= $_REQUEST["movimiento"];
$ct		= $_REQUEST["ct"];




if($rfc == ""  || $nombre== "") {
	$resp = array("error" => "1" ,"errorMsg" => "Campos Invalidos","msg" => "Campos Invalidos");
	echo json_encode( $resp );
	exit;
}else{
	$insert = "INSERT INTO bitacora VALUES ('', '".$rfc."', '".$nombre."','".$curp."', '".$cvepre."', '".$desde."','".$hasta."','".$movimiento."','".$ct."','".date("Y-m-d H:i:s")."','".date("Y-m-d H:i:s")."')";

	//ChromePhp::log($insert);

	mysqli_query($conn, $insert);
	$resp = array("success" => "1", "msg" => "La nueva Plaza se agrego exitosamente.");
	echo json_encode( $resp );
	exit;
}
?>