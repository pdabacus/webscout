<?php 
include("interfacer.php");

function login($user, $pass, $loc) {
	$data = array(
	  "user" => $user,
	  "pass" => $pass,
	  "action" => "login"
	);

	$resp = getData($data);

	if (!($resp->login && $resp->valid)) {
	  header("Location: $loc");
	  die();
	}
}

?>
