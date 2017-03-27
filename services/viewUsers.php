<?php 

require_once("config.php");

$select = "SELECT * FROM bitacora order by created_at";
$rs = mysqli_query($conn, $select);
$rowcount=mysqli_num_rows($rs);
while($list = mysqli_fetch_assoc($rs)){
	$data[] = array('id'=> $list['id'],'rfc'=> $list['rfc'], 'nombre'=> $list['nombre'], 'curp'=> $list['curp'], 'cvepre'=> $list['cvepre'],'desde'=> $list['desde'],'hasta'=> $list['hasta'],'movimiento'=> $list['movimiento'],'ct'=> $list['ct'], 'created_at'=> $list['created_at']);
}
//$resp = array("data" => array("success" => "1" , "rowCount"=> $rowcount, "data" => $data) );
$resp = array("success" => "1" , "rowCount"=> $rowcount, "userList" => $data);
echo json_encode( $resp );



exit;
?>