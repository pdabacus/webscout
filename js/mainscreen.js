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

var findMatch = function() {
	if (main.orientation < 1) {
		var error = errorHTML("Must Select An Orientation");
		$("#scout-match-error").html(error);

	} else {
		$('#select-match-modal').modal('show');
		$("#select-match-modal-content").html('<div class="loader"></div>');

// uncomment to delay GET by 1 milliseconds
//setTimeout(function() {

	$.get("php/get-matches.php?year=" + year, function(data) {
		var html = "";
		var matchType = "";
		var matchNumber = 0;

		if (data != null && data.length > 10) {
			matches = JSON.parse(data);

			for (var team in matches) {
				html += '<h2>Team ' + team + '</h2>';
				html += '<div class="row">';

				for (var i = 0; i < Object.keys(matches[team]).length; i++) {
					matchType = Object.keys(matches[team]).reverse()[i];

					for (var j = 0; j < Object.keys(matches[team][matchType]).length; j++) {
						matchNumber = Object.keys(matches[team][matchType]).reverse()[j];

						html += '<div class="col-xs-6 col-md-4">';

						html += '<h3>' + capitalize(matchType) + ' ' + matchNumber + '</h3>';

						html += '<div class="match container-fluid" style="padding:0px">';

						for (var alliance in matches[team][matchType][matchNumber]) {
							html += '<div class="' + alliance + ' col-xs-6">';
							html += '<h4>' + capitalize(alliance) + '</h4>';
							for (var k = 1; k <= 3; k++) {
								html += '<p onclick="scoutMatch(';
								html += team + ',';
								html += "'" + matchType + "',";
								html += matchNumber + ',';
								html += "'" + alliance + "',";
								html += matches[team][matchType][matchNumber][alliance][k];
								html += ')">';
								html += matches[team][matchType][matchNumber][alliance][k];
								html += '</p>';
							}
							html += '</div>';
						}

						html += '</div>';
						html += '</div>';
					}
				}

				html += '</div>';
			}

		} else {
			html = '<div class="col-xs-12"><p>No Matches Were Found</p></div>';
		}

		$("#select-match-modal-content").html(html);

	});

// uncomment to delay GET by 1000 milliseconds
//}, 1000);

	}
}

var scoutMatch = function(team, matchType, matchNumber, alliance, robot) {
	$("#body").fadeOut(500);
	setTimeout(function() {
		var parameters = "orientation=" + main.orientation + "&";
		parameters += "team=" + team + "&";
		parameters += "matchType=" + matchType + "&";
		parameters += "matchNumber=" + matchNumber + "&";
		parameters += "alliance=" + alliance + "&";
		parameters += "robot=" + robot;
		window.location.href = "app/" + year + "/scout/?" + parameters;
	}, 500);
}

var startHub = function() {
	$("#body").fadeOut(500);
	setTimeout(function() {
		window.location.href = "app/" + year + "/hub/";
	}, 500);
}
