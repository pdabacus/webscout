<?php

include("get_post_utils.php");
include("years.php");
include("interfacer.php");

header("Access-Control-Allow-Origin: *");

//set year to specified year
$year = date("Y");
if (getpostset("year")) {
	$year = getpost("year");
}
$year = checkYear($year);

$parameters = array(
	"action",
	"user",
	"pass",
	"newpass",
	"file",
	"file_content",
	"match_type",
	"match_number",
	"match_content",
	"alliance_color",
	"alliance_number",
	"robot_content"
);

$commands = array(
	"test",
	"login",
	"create_account",
	"delete_account",
	"change_password",
	"create_file",
	"delete_file",
	"get_file_list",
	"get_match_list",
	"get_robot_list",
	"get_file",
	"set_file",
	"get_match",
	"set_match",
	"get_robot",
	"set_robot"
);

$data = array();

foreach (array_merge($_POST, $_GET) as $key => $value) {
	if (getpostset($key) && in_array($key, $parameters)) {
		$data[$key] = getpost($key);
	}
}

echo json_encode(getData($data));

?>
