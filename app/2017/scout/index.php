<?php
include("../../../php/get_post_utils.php");
include("../../../php/login.php");

//$orientation
if (getpostset("orientation")) {
  $orientation = getpost("orientation");
}
if (!in_array($orientation, array("1","2"))){
  $orientation = "1";
}

//$user
if (getpostset("user")) {
  $user = getpost("user");
}
if (strlen($user) < 2 || 6 < strlen($user)){
  $user = "1111";
}

//$pass
if (getpostset("pass")) {
  $pass = getpost("pass");
}
if (strlen($pass) < 20){
  $pass = "lololol";
}

//$file
if (getpostset("file")) {
  $file = getpost("file");
}
if (strlen($file) < 5){
  $file = "record.json";
}

//$match_type
if (getpostset("match_type")) {
  $match_type = getpost("match_type");
}
if (!in_array($match_type, array("qual","elim"))){
  $match_type = "qual";
}

//$match_number
if (getpostset("match_number")) {
  $match_number = getpost("match_number");
}
if (strlen($match_number) < 1 || 4 < strlen($match_number)){
  $match_number = "1";
}

//$alliance_color
if (getpostset("alliance_color")) {
  $alliance_color = getpost("alliance_color");
}
if (!in_array($alliance_color, array("red","blue"))){
  $alliance_color = "red";
}

//$alliance_number
if (getpostset("alliance_number")) {
  $alliance_number = getpost("alliance_number");
}
if (strlen($alliance_number) != 1){
  $alliance_number = "1";
}

//$robot_number
if (getpostset("robot_number")) {
  $robot_number = getpost("robot_number");
}
if (strlen($robot_number) < 2 || 6 < strlen($robot_number)){
  $robot_number = "9999";
}

login($user, $pass, "../../../");

?><!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <title>Steamworks 2017 Scouting</title>
    <script type="text/javascript" src="../../../js/jquery.min.js"></script>
    <script type="text/javascript" src="../../../js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../../../js/utils.js"></script>
    <script type="text/javascript" src="js/scout.js"></script>
    <link rel="stylesheet" type="text/css" href="../../../css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../../../css/style.css">
  </head>
  <body id="body">
    <script type="text/javascript">
      var main = {
        orientation: <?php echo "$orientation"; ?>,
        user: <?php echo "\"$user\""; ?>,
        pass: <?php echo "\"$pass\""; ?>,
        file: <?php echo "\"$file\""; ?>,
        matchType: <?php echo "\"$match_type\""; ?>,
        matchNumber: <?php echo "$match_number"; ?>,
        allianceColor: <?php echo "\"$alliance_color\""; ?>,
        allianceNumber: <?php echo "$alliance_number"; ?>,
        robotNumber: <?php echo "$robot_number"; ?> 
      }
    </script>
    <div class="container-fluid" style="text-align: center;">
      <div class="col-xs-1 col-sm-2 col-md-3"></div>
      <div class="fadein col-xs-10 col-sm-8 col-md-6" style="margin: 40px auto">
        <h1>Orientation <?php echo "$orientation"; ?> Selected</h1>
      </div>
      <div class="col-xs-1 col-sm-2 col-md-3"></div>
    </div>
  </body>
</html>
