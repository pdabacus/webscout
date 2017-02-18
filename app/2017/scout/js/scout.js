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
	setTimeout(loadForm, 1200);
});

var loadForm = function() {
	$("#body").fadeOut(500);
	setTimeout(function() {
		var html = '<div class="container-fluid" style="text-align: center;">';
		html += '<div class="col-xs-1 col-sm-2 col-md-3"></div>';
		html += '<div class="col-xs-10 col-sm-8 col-md-6" style="margin: 40px auto">';

		html += "<h2>Team " + main.team + " Scouting:</h2>";
		html += "<h3>" + main.matchType + " " + main.matchNumber + " match</h3>";
		html += "<h3>" + main.alliance + " alliance</h3>";
		html += "<h3>robot " + main.robot + "</h3>";

		html += '</div>';
		html += '<div class="col-xs-1 col-sm-2 col-md-3"></div>';
		html += '</div>';

		$("#body").html(html);
		$("#body").fadeIn(500);
	}, 500);
}

