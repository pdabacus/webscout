var main = {
	orientation: 0
}

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

var transitionElement = function(elem, html, time) {
		var el = $("#" + elem);

		el.fadeOut(time);
		setTimeout(function() {
			el.html(html);
			el.fadeIn(time);
		}, time);

}

var scoutMatch = function() {

	var html = "";

	if (main.orientation < 1) {
		html = errorHTML("Must Select An Orientation");
		html += '<div class="button" onclick="scoutMatch()">';	
		html += '<div>Scout Match</div>';
		html += '</div>';

		$("#scoutMatch").html(html);

	} else {
		html = '<div class="container-fluid" style="text-align: center;">';
		html += '<div class="col-xs-1 col-sm-2 col-md-3"></div>';
		html += '<div class="col-xs-10 col-sm-8 col-md-6" style="margin: 40px auto">';
		html += '<h1>Orientation ' + main.orientation + ' Selected</h1>';
		html += '</div>';
		html += '<div class="col-xs-1 col-sm-2 col-md-3"></div>';
		html += '</div>';

		transitionElement("body", html, 500);
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
