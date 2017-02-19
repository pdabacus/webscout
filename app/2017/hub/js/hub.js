$(document).ready(function() {
	$(".fadein").fadeIn(500);
});

var signIn = function() {
	user = document.getElementById("user").value;
	pass = md5(document.getElementById("pass").value);

	if (user == "asdf") {
		var error = errorHTML("invalid username");
		$("#sign-in-error").html(error);
	} else {
		$("#sign-in-error").html("<p>user:" + user + "</p><p>pass:" + pass + "</p>");
	}

}
