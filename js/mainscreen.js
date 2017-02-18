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
		$("#select-match-modal-content").html('<div class="loader"></div>');

// uncomment to delay GET by 1 milliseconds
setTimeout(function() {

	$.get("php/get-matches.php", function(data) {
		var html = "";

		if (data != null && data.length > 10) {
			var matches = JSON.parse(data);

			for (var team in matches) {
				html += '<h2>Team ' + team + '</h2>';
				html += '<div class="row">';

				for (var matchType in matches[team]) {
					for (var matchNumber in matches[team][matchType]) {
						html += '<div class="col-xs-6 col-md-4">';
						html += '<h3>' + matchType.toUpperCase() + ' ' + matchNumber + '</h3>'
						html += '<div class="match container-fluid" style="padding:0px">';

						html += '<div class="red col-xs-6">';
						html += '<h4>Red</h4>';
						for (var i = 1; i <= 3; i++) {
							html += "<p>";
							html += matches[team][matchType][matchNumber]["red"][i];
							html += "</p>";
						}
						html += '</div>';

						html += '<div class="blue col-xs-6">';
						html += '<h4>Blue</h4>';
						for (var i = 1; i <= 3; i++) {
							html += "<p>";
							html += matches[team][matchType][matchNumber]["blue"][i];
							html += "<br/>";
						}
						html += '</div>';

						html += '</div>';
						html += '</div>';
					}
				}

				html += '</div>';
				html += '<hr/>';
			}

		} else {
			html = '<div class="col-xs-12"><p>No Matches Were Found</p></div>';
		}

		$("#select-match-modal-content").html(html);

	});

// uncomment to delay GET by 1000 milliseconds
}, 1000);


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
