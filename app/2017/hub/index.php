<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <title>Steamworks 2017 Scouting Hub</title>
    <script type="text/javascript" src="../../../js/jquery.min.js"></script>
    <script type="text/javascript" src="../../../js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../../../js/md5.min.js"></script>
    <script type="text/javascript" src="js/hub.js"></script>
    <link rel="stylesheet" type="text/css" href="../../../css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../../../css/style.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
  </head>
  <body id="body">

  <div class="">

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
            <div class="button">
              <div>Create Account</div>
            </div>
          </div>
          <div class="col-xs-3 col-md-4"></div>
        </div>
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
