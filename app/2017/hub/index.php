<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <title>Steamworks 2017 Scouting Hub</title>
    <script type="text/javascript" src="../../../js/jquery.min.js"></script>
    <script type="text/javascript" src="../../../js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../../../js/md5.min.js"></script>
    <script type="text/javascript" src="../../../js/utils.js"></script>
    <script type="text/javascript" src="js/hub.js"></script>
    <link rel="stylesheet" type="text/css" href="../../../css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../../../css/style.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
  </head>
  <body id="body">

    <div
      id="create-account-modal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="Create Account">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Create Account</h4>
          </div>
          <div class="modal-body container-fluid">
            <p>Create Account</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Dismiss</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid" style="text-align: center;">
      <!-- left spacer -->
      <div class="col-sm-1 col-md-2"></div>
      <!-- main page -->
      <div id="page" class="fadein col-xs-12 col-sm-10 col-md-8">
        <!-- -->
        <h1>Steamworks 2017 Scouting Hub</h1>
        <hr/>
        <!-- signin fields -->
        <div class="row">
          <div class="col-sm-1 col-md-2"></div>
          <div class="col-xs-12 col-sm-10 col-md-8">
            <input id="user" class="textinput" type="text" placeholder="Username"/>
            <br/>
            <input id="pass" class="textinput" type="password" placeholder="Password"/>
          </div>
          <div class="col-sm-1 col-md-2"></div>
        </div>
        <!-- sign in button-->
        <div class="row">
          <div class="col-xs-3 col-md-4"></div>
          <div class="col-xs-6 col-md-4">
            <div id="sign-in-error"></div>
            <div class="button" onclick="signIn()">
              <div>Sign In</div>
            </div>
          </div>
          <div class="col-xs-3 col-md-4"></div>
        </div>
        <hr/>
        <!-- create account button-->
        <div class="row">
          <div class="col-xs-3 col-md-4"></div>
          <div class="col-xs-6 col-md-4">
            <div class="button" data-toggle="modal" data-target="#create-account-modal">
              <div>Create Account</div>
            </div>
          </div>
          <div class="col-xs-3 col-md-4"></div>
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
