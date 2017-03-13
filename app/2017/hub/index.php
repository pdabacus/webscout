<?php
include("../../../php/get_post_utils.php");
include("../../../php/login.php");

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

login($user, $pass, "../../../");

?><!DOCTYPE html>
<html> 
  <head>
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <title>Steamworks 2017 Scouting Hub</title>
    <script type="text/javascript" src="../../../js/jquery.min.js"></script>
    <script type="text/javascript" src="../../../js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../../../js/utils.js"></script>
    <script type="text/javascript" src="js/hub.js"></script>
    <link rel="stylesheet" type="text/css" href="../../../css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../../../css/style.css">
  </head>
  <body id="body">
    <script type="text/javascript">
      var main = {
        user: <?php echo "\"$user\""; ?>,
        pass: <?php echo "\"$pass\""; ?> 
      }
    </script>
    <div
      id="create-match-modal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="Create Match">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Create Match</h4>
          </div>
          <div class="modal-body container-fluid" style="text-align: center;">
            <hr/>
            <!-- match type and number fields -->
            <div class="row">
              <div class="col-xs-0 col-sm-2 col-md-3"></div>
              <div class="col-xs-6 col-sm-4 col-md-3">
                <input
                  id="match_type"
                  class="textinput"
                  type="text"
                  placeholder="Match Type"/>
                <hr/>
              </div>
              <div class="col-xs-6 col-sm-4 col-md-3">
                <input
                  id="match_number"
                  class="textinput"
                  type="number"
                  placeholder="Match Number"/>
                <hr/>
              </div>
              <div class="col-xs-0 col-sm-2 col-md-3"></div>
            </div>
            <!-- red and blue alliance robots -->
            <div class="row">
              <div class="col-xs-1 col-sm-2 col-md-3"></div>
              <div class="red border col-xs-5 col-sm-4 col-md-3">
                <input
                  id="r1"
                  class="textinput"
                  type="number"
                  placeholder="Robot 1"/>
                <input
                  id="r2"
                  class="textinput"
                  type="number"
                  placeholder="Robot 2"/>
                <input
                  id="r3"
                  class="textinput"
                  type="number"
                  placeholder="Robot 3"/>
              </div>
              <div class="blue border col-xs-5 col-sm-4 col-md-3">
                <input
                  id="b1"
                  class="textinput"
                  type="number"
                  placeholder="Robot 1"/>
                <input
                  id="b2"
                  class="textinput"
                  type="number"
                  placeholder="Robot 2"/>
                <input
                  id="b3"
                  class="textinput"
                  type="number"
                  placeholder="Robot 3"/>
              </div>
              <div class="col-xs-1 col-sm-2 col-md-3"></div>
            </div>
            <!-- create match button-->
            <div class="row">
              <div id="create-match-error"></div>
              <div class="col-xs-2 col-md-4"></div>
              <div class="col-xs-8 col-md-4">
                <div class="button" onclick="createMatch()">
                  <div>Create Match</div>
                </div>
              </div>
              <div class="col-xs-2 col-md-4"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Dismiss</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div id="page" class="fadein col-xs-12" style="margin: 15px; padding: 10px">
        <div class="container-fluid" style="padding: 0px;">
          <div class="row">
            <div class="row-height">
              <div class="col-xs-3 col-height">
                <div class="inside">
                  <h3>Matches</h3>
                  <hr style="margin-bottom: 0px;"/>
                  <!-- matches list -->
                  <div id="navbar" style="max-height: 300px">
                    <h4>Qual</h4>
                    <div id="qual"></div>
                    <hr/>
                    <h4>Elim</h4>
                    <div id="elim"></div>
                  </div>
                </div>
              </div>
              <div class="col-xs-9 col-height">
                <div class="inside">
                  <!-- main page -->
                  <h1>Steamworks 2017 Scouting Hub</h1>
                  <hr/>
                  <div id="match-container" class="container-fluid">
                    <h3 style="margin: 15% 0px;">Load a match to see its details</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr style="margin-top: 0px;"/>
        <!-- button bar -->
        <div class="row">
          <!-- left button bar spacer -->
          <div class="col-md-1"></div>
          <div id="button-bar"></div>
          <!-- right button bar spacer -->
          <div class="col-md-1"></div>
        </div>
        <hr/>
        <!-- footer -->
        <div id="footer"">
          <div>Copyright &copy; <?php echo date("Y"); ?> Swift Creek Robotics</div>
        </div>
      </div>
    </div>
  </body>
</html>
