<?php
include("../../../php/get_post_utils.php");

if (getpostset("orientation")) {
  $orientation = getpost("orientation");
}

?><!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <title><?php echo "$years[$year] $year Scouting"; ?></title>
    <script type="text/javascript" src="../../../js/jquery.min.js"></script>
    <script type="text/javascript" src="../../../js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/scout.js"></script>
    <link rel="stylesheet" type="text/css" href="../../../css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../../../css/style.css">
  </head>
  <body id="body">
  <script type="text/javascript">
    var main = {
    	orientation: <?php echo "\"$orientation\""; ?>;
    }
  </script>
  </body>
</html>
