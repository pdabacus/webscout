var orientation = 0;

var setOrientation = function(i) {
	orientation = i;

	var clickedOrientation = $("#orientation" + i);
	var otherOrientation = $("#orientation" + (3-i));

	clickedOrientation.css("opacity", "1.0");
	otherOrientation.css("opacity", "0.70");
}

var errorHTML = function(msg) {
	return '<h4 style="color: #FF3344">ERROR: ' + msg + '</h4>';
}

var scoutMatch = function() {

	var html = "";

	if (orientation < 1) {
		html = errorHTML("Must Select An Orientation");
		html += '<div class="button" onclick="scoutMatch()">';	
		html += '<div>Scout Match</div>';
		html += '</div>';
		$("#scoutMatch").html(html);
	} else { 

		var body = $("#body");
		var time = 500;

		html = '<div class="container-fluid" style="text-align: center;">';
		html += '<div class="col-xs-1 col-sm-2 col-md-3"></div>';
		html += '<div class="col-xs-10 col-sm-8 col-md-6" style="margin: 40px auto">';
		html += '<h2>Orientation ' + orientation + ' Selected</h2>';
		html += '</div>';
		html += '<div class="col-xs-1 col-sm-2 col-md-3"></div>';
		html += '</div>';

		body.fadeOut(time);
		setTimeout(function() {
			body.html(html);
			body.fadeIn(time);
		}, time);
	
	}

}