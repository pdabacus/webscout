var main = {
	orientation: 0
}

$(document).ready(function() {
	$("#check-js").hide();
	$(".fadein").fadeIn(500);
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

var findMatch = function() {
	if (main.orientation < 1) {
		var error = errorHTML("Must Select An Orientation");
		$("#scout-match-error").html(error);

	} else {
		$('#select-match-modal').modal('show');
	}
}

var scoutMatch = function() {
	$("#body").fadeOut(500);
	setTimeout(function() {
		window.location.href = "app/" + year + "/scout/?orientation=" + main.orientation;
	}, 500);
}

var startHub = function() {
	$("#body").fadeOut(500);
	setTimeout(function() {
		window.location.href = "app/" + year + "/hub/";
	}, 500);
}
