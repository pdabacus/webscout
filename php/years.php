<?php

//list of valid years
$years = array(
  "2016" => "Stronghold",
  "2017" => "Steamworks",
  "2018" => "???",
);

//sets year to default if invalid year specified
function checkYear($y) {
	global $years;
	if (!in_array($y, array_keys($years))) {
		return date("Y");
	}
	return $y;
}

//gets game from year
function getGame($y) {
	global $years;
	return $years[$y];
}

//gets year from game
function getYear($g) {
	global $years;
	return array_search($g, $years);
}

?>
