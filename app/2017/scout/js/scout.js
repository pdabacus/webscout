$(document).ready(function() {
	$(".fadein").fadeIn(500);
	setTimeout(loadForm, 1000);
});

var loadForm = function() {
	var html = '<div class="container-fluid" style="text-align: center;">';
	html += '<div class="col-xs-1 col-sm-2 col-md-3"></div>';
	html += '<div class="col-xs-10 col-sm-8 col-md-6" style="margin: 40px auto">';

	html += "<h2>Team " + main.user + " Scouting:</h2>";
	html += "<h3>" + main.matchType + " " + main.matchNumber + " match</h3>";
	html += "<h3>" + main.allianceColor + " alliance</h3>";
	html += "<h3>robot " + main.robotNumber + "</h3>";

	html += '</div>';
	html += '<div class="col-xs-1 col-sm-2 col-md-3"></div>';
	html += '</div>';

	transitionElement("body", html, 500);
}
