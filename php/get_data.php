<?php

include("get_post_utils.php");
include("years.php");
include("interfacer.php");

//set year to specified year
$year = "2017";
if (getpostset("year")) {
  $year = getpost("year");
}
$year = checkYear($year);

$commands = array(
	"test",
	"login",
	"create_account",
	"delete_account",
	"change_password",
	"create_file",
	"delete_file",
	"get_file_list",
	"get_file",
	"set_file",
	"get_match",
	"set_match",
	"get_robot",
	"set_robot"
);

$big = '{"qual":{"1":{"red":{"1":{"team":1,"scouted":false},"2":{"team":2,"scouted":false},"3":{"team":3,"scouted":false}},"blue":{"1":{"team":4,"scouted":false},"2":{"team":5,"scouted":false},"3":{"team":6,"scouted":false}}}},"elim":{}}';

$small = '{"qual":{},"elim":{}}';

$match = '{"red":{"1":{"team":1,"scouted":false},"2":{"team":2,"scouted":false},"3":{"team":3,"scouted":false}},"blue":{"1":{"team":4,"scouted":false},"2":{"team":5,"scouted":false},"3":{"team":6,"scouted":false}}}';

$robot = '{"team":1,"scouted":false}';

$data = array(
	"user" => "4828",
	"pass" => "de3f712d1a02c5fb481a7a99b0da7fa3",
	"file" => "pitt.json",
	"match_type" => "qual",
	"match_number" => "5",
	"alliance_color" => "red",
	"alliance_number" => "3",
	"robot_content" => $robot,
	"match_content" => $match,
	"file_content" => $small,
	"action" => "login"
);

print_r(getData($data));

?>
