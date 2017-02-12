var transitionElement = function(elem, html, time) {
		var el = $("#" + elem);

		el.fadeOut(time);
		setTimeout(function() {
			el.html(html);
			el.fadeIn(time);
		}, time);
}

$(document).ready(function() {
	$(".fadein").fadeIn(500);
});

var signIn = function() {
	user = document.getElementById("user").value;
	pass = document.getElementById("pass").value;
	alert("user: " + user + "\npass: " + pass);
}
