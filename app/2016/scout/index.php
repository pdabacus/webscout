<?php
include("../../../php/get_post_utils.php");

$year = "2016";
$orientation = "1";
if (getpostset("orientation")) {
  $orientation = getpost("orientation");
}
include("../../../php/header.php");

/*
?>
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <title>Stronghold 2016 Scouting</title>
    <script type="text/javascript" src="../../../js/jquery.min.js"></script>
    <script type="text/javascript" src="../../../js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/scout.js"></script>
    <link rel="stylesheet" type="text/css" href="../../../css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../../../css/style.css">
  </head>
<?php
*/
?>
  <body id="body">
  <script type="text/javascript">
    var main = {
    	orientation: <?php echo "$orientation"; ?> 
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
