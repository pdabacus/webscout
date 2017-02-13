<?php
//Header file for all pages

//name of root directory
define("SITE_ROOT", "webscout");

//list of valid years
$years = array(
"2016" => "Stronghold",
"2017" => "Steamworks",
);

//sets year to default if invalid year specified
if (!in_array($year, array_keys($years))) {
  $year = date("Y");
}  
?>

<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <title><?php echo "$years[$year] $year Scouting"; ?></title>
    <script type="text/javascript" src="/<?php echo SITE_ROOT; ?>/js/jquery.min.js"></script>
    <script type="text/javascript" src="/<?php echo SITE_ROOT; ?>/js/mainscreen.js"></script>
    <link rel="stylesheet" type="text/css" href="/<?php echo SITE_ROOT; ?>/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/<?php echo SITE_ROOT; ?>/css/style.css">
  </head>