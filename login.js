$(document).ready(function() {
	$(".fadein").fadeIn(500);
});

var signIn = function() {
	var user = document.getElementById("user").value;
	var pass = md5(document.getElementById("pass").value);

	if (2 < user.length && user.length < 7) {
		var request = {
			user: user,
			pass: pass,
			action: "login"
		};

		$.get("php/get_data.php", request, function(data) {
			var error = "";
			if (data.length > 10) {
				response = JSON.parse(data);
				if (response.valid && response[request.action]) {
					transitionElement("body", "", 500);
					setTimeout(function() {
						redirect("app/", {year: year, user: request.user, pass: request.pass});
					}, 500);
					
				} else {
					error = errorHTML(response.error);
				}
			} else {
				error = errorHTML("internal server error");
			}

			$("#sign-in-error").html(error);
		});
	} else {
		error = errorHTML("invalid team number");
		$("#sign-in-error").html(error);
	}
}

var createAccount = function() {
	var user = document.getElementById("newuser").value;
	var pass1 = md5(document.getElementById("newpass1").value);
	var pass2 = md5(document.getElementById("newpass2").value);

	if (pass1 == pass2) {
		if (2 < user.length && user.length < 7) {
			var request = {
				user: user,
				pass: pass1,
				action: "create_account"
			};

			$.get("php/get_data.php", request, function(data) {
				var error = "";
				if (data.length > 10) {
					response = JSON.parse(data);
					if (response.valid && response["create_account"]) {
						error = "<h4>account created</h4>";
					} else {
						error = errorHTML(response.error);
					}
				} else {
					error = errorHTML("internal server error");
				}

				$("#create-account-error").html(error);
			});
		} else {
			error = errorHTML("invalid team number");
		}
	} else {
		error = errorHTML("passwords do not match");
	}

	$("#create-account-error").html(error);
}
