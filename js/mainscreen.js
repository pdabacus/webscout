var main = {
	orientation: 0
}

$(document).ready(function() {
	$("#checkjs").hide();
});

var setOrientation = function(i) {
	main.orientation = i;

	var clickedOrientation = $("#orientation" + i);
	var otherOrientation = $("#orientation" + (3-i));

	clickedOrientation.css("opacity", "1.0");
	otherOrientation.css("opacity", "0.75");

	clickedOrientation.off("mouseenter mouseleave");
	otherOrientation.mouseenter(function() {
		$(this).css("opacity", "0.90");
	});
	otherOrientation.mouseleave(function() {
		$(this).css("opacity", "0.75");
	});
}

var errorHTML = function(msg) {
	return '<h4 style="color: #FF3344">ERROR: ' + msg + '</h4>';
}

var scoutMatch = function() {
	if (main.orientation < 1) {
		var error = errorHTML("Must Select An Orientation");
		$("#scoutMatchError").html(error);

	} else {
		$("#body").fadeOut(500);
		setTimeout(function() {
			window.location.href = "app/" + year + "/scout/?orientation=" + main.orientation;
		}, time);
	}
}

var startHub = function() {
	html = '<div class="container-fluid" style="text-align: center;">';
	html += '<div class="col-sm-1 col-md-2"></div>';
	html += '<div id="page" class="col-xs-12 col-sm-10 col-md-8">';
	html += '<h1>Scouting Hub</h1>';
	html += '<h4></h4>';
	html += '</div>';
	html += '<div class="col-sm-1 col-md-2"></div>';
	html += '</div>';

	transitionElement("body", html, 500);
}
