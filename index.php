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
  $year = date("Y");
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
  <script type="text/javascript">
    var year = <?php echo "\"$year\""; ?>;
    var years = <?php echo json_encode($years); ?>;
  </script>

    <!-- select team and match modal -->
    <div
      id="select-match-modal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="Select Match">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Select Match</h4>
          </div>
          <div class="modal-body container-fluid">
            <div class="match" onclick="scoutMatch()">CLICK ME</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Dismiss</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <!-- left spacer-->
      <div class="col-sm-1 col-md-2"></div>
      <!-- main page -->
      <div id="page" class="fadein col-xs-12 col-sm-10 col-md-8">
        <!-- title -->
        <a href="./"><h1><?php echo "$years[$year] $year Scouting"; ?></h1></a>
        <hr/>
        <!-- check if javascript enabled -->
        <h3 id="check-js">Please Enable JavaScript</h3>
        <!-- pick orientation -->
        <h3>Choose Orientation</h3>
        <div class="row">
          <div class="col-sm-1 col-md-2"></div>
          <div class="col-xs-12 col-sm-10 col-md-8">
            <img
              id="orientation1"
              class="orientation-img"
              src=<?php echo "\"app/$year/img/field/field.png\""; ?> 
              onclick="setOrientation(1)"/>
            <br/>
            <img
              id="orientation2"
              class="orientation-img"
              src=<?php echo "\"app/$year/img/field/field.png\""; ?> 
              onclick="setOrientation(2)">
          </div>
          <div class="col-sm-1 col-md-2"></div>
        </div>

        <!-- start scouting button -->
        <div class="row">
          <div class="col-xs-12">
            <div id="scout-match-error"></div>
            <div class="button" onclick="findMatch()">
              <div>Scout Match</div>
            </div>
          </div>
        </div>
        <hr/>
        <!-- start hub button -->
        <div class="row">
          <div class="col-xs-12">
            <div class="button" onclick="startHub()">
              <div>Hub</div>
            </div>
          </div>
        </div>
        <hr/>
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
