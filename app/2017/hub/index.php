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
            <!-- match type and number fields -->
            <div class="row">
              <div class="col-xs-1 col-sm-2 col-md-3"></div>
              <div class="col-xs-5 col-sm-4 col-md-3">
                <input
                  id="match_type"
                  class="textinput"
                  type="text"
                  placeholder="Match Type"/>
                <hr/>
              </div>
              <div class="col-xs-5 col-sm-4 col-md-3">
                <input
                  id="match_number"
                  class="textinput"
                  type="number"
                  placeholder="Match Number"/>
                <hr/>
              </div>
              <div class="col-xs-1 col-sm-2 col-md-3"></div>
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
            <hr/>
            <!-- create account button-->
            <div class="row">
              <div class="col-xs-2 col-md-4"></div>
              <div id="create-account-error"></div>
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

    <div class="container-fluid">
      <!-- left spacer -->
      <div class="col-sm-1 col-md-2"></div>
      <div id="page" class="fadein col-xs-12 col-sm-10 col-md-8">
        <h1>Steamworks 2017 Scouting Hub</h1>
        <!-- create match -->
        <div class="row">
          <div class="col-xs-3"></div>
          <div class="col-xs-6">
            <div class="button" data-toggle="modal" data-target="#create-match-modal">
              <div>Create Match</div>
            </div>
          </div>
          <div class="col-xs-3"></div>
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
