<?php

include("get_post_utils.php");
include("years.php");

//set year to specified year
if (getpostset("year")) {
  $year = getpost("year");
}

$year = checkYear($year);



//creates JSON string for all matches
function makeJSON() {

	$red = array(1 => 123, 2 => 234, 3 => 345);
	$blue = array(1 => 456, 2 => 567, 3 => 678);

	$m1 = array("red" => $red, "blue" => $blue);
	$m2 = array("red" => $red, "blue" => $blue);

	$qual = array("1" => $m1, "2" => $m2);
	$elim = array("1" => $m1, "2" => $m2);

	$t1 = array("qual" => $qual, "elim" => $elim);
	$t2 = array("qual" => $qual, "elim" => $elim);

	$arr = array("4828" => $t1, "69" => $t2);

	return json_encode($arr);
}

echo makeJSON();

?>
