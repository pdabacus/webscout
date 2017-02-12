<?php
include("php/get_post_utils.php");

//set year to specified year
if (getpostset("year")) {
  $year = getpost("year");
}

//list of valid years
$years = array(
  "2016" => "Stronghold",
  "2017" => "Steamworks",
);

//sets year to default if invalid year specified
if (!in_array($year, array_keys($years))) {
  $year = "2017";
}

?><!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <title><?php echo "$years[$year] $year Scouting"; ?></title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/mainscreen.js"></script>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
  </head>
  <body id="body">

    <div class="container-fluid">
      <!-- left spacer-->
      <div class="col-sm-1 col-md-2"></div>
      <!-- main page -->
      <div id="page" class="col-xs-12 col-sm-10 col-md-8">
        <!-- title -->
        <a href="./"><h1><?php echo "$years[$year] $year Scouting"; ?></h1></a>
        <hr>
        <!-- pick orientation title -->
        <div class="row">
          <div class="col-xs-12">
            <h3>Choose Orientation</h3>
          </div>
        </div>
        <!-- orientation 1 -->
        <div class="row">
          <div class="col-sm-1 col-md-2"></div>
          <div class="col-xs-12 col-sm-10 col-md-8">
            <img
              id="orientation1"
              class="orientation-img"
              src="app/<?php echo $year; ?>/img/field/field.png"
              onclick="setOrientation(1)">
          </div>
          <div class="col-sm-1 col-md-2"></div>
        </div>
        <!-- orientation 2-->
        <div class="row">
          <div class="col-sm-1 col-md-2"></div>
          <div class="col-xs-12 col-sm-10 col-md-8">
            <img
              id="orientation2"
              class="orientation-img"
              src="app/<?php echo $year; ?>/img/field/field.png"
              onclick="setOrientation(2)">
          </div>
          <div class="col-sm-1 col-md-2"></div>
        </div>
        <!-- start scouting button -->
        <div class="row">
          <div class="col-xs-12" id="scoutMatch">
            <div class="button" onclick="scoutMatch()">
              <div>Scout Match</div>
            </div>
          </div>
        </div>
        <hr>
        <!-- hub-->
        <div class="row">
          <div class="col-xs-12">
            <div class="button" onclick="startHub()">
              <div>Hub</div>
            </div>
          </div>
        </div>
        <hr>
        <!-- footer -->
        <div id="footer"">
          <div>Copyright &copy; <?php echo date("Y"); ?> Swift Creek Robotics</div>
        </div>
      </div>
      <!-- right spacer -->
      <div class="col-sm-1 col-md-2"></div>
    </div>

  </body>
</html>
