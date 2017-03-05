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
		$("#select-match-modal").modal("show");
		$("#select-match-modal-content").html('<div class="loader"></div>');

// uncomment to delay GET by 1000 milliseconds
//setTimeout(function() {

	request = {
		year: year,
		user: main.user,
		pass: main.pass,
		file: "pitt.json",
		action: "get_file"
	};

	$.get("../php/get_data.php", request, function(data) {
		var html = "";
		var response = {};
		var matches = {};

		var matchType = "";
		var matchNumber = 0;
		var robot = {};
		
		if (data.length > 10) {
			response = JSON.parse(data);
			if (response.valid && response[request.action]) {
				matches = JSON.parse(response.file_content);
				html = '<h2> Team ' + request.user + '</h2>';

				for (var i = 0; i < Object.keys(matches).length; i++) {
					matchType = Object.keys(matches).reverse()[i];

					for (var i = 0; i < Object.keys(matches[matchType]).length; i++) {
						matchNumber = Object.keys(matches[matchType]).reverse()[i];
					
						html += '<div class="col-xs-6 col-md-4">';
						html += '<h3>' + capitalize(matchType) + ' ' + matchNumber + '</h3>';
						html += '<div class="match container-fluid" style="padding:0px">';

						for (var allianceColor in matches[matchType][matchNumber]) {
							html += '<div class="' + allianceColor + ' col-xs-6">';
							html += '<h4>' + capitalize(allianceColor) + '</h4>';
							for (var k = 1; k <= 3; k++) {
								robot = matches[matchType][matchNumber][allianceColor][k];
								html += '<p onclick="scoutMatch(';
								html += "'" + request.file + "',";
								html += "'" + matchType + "',";
								html += "'" + matchNumber + "',";
								html += "'" + allianceColor + "',";
								html += "'" + k + "',";
								html += "'" + robot.team + "'";
								html += ')">';
								html += robot.team;
								html += '</p>';
							}
							html += '</div>';
						}

						html += '</div>';
						html += '</div>';

					}
				}
				
			} else {
				html = '<div class="col-xs-12">' + errorHTML(response.error) + '</div>';
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

var scoutMatch = function(file, matchType, matchNumber, allianceColor, allianceNumber, robotNumber) {
	$("#body").fadeOut(500);
	setTimeout(function() {
		var parameters = {
			orientation: main.orientation,
			user: main.user,
			pass: main.pass,
			file: file,
			match_type: matchType,
			match_number: matchNumber,
			alliance_color: allianceColor,
			alliance_number: allianceNumber,
			robot_number: robotNumber
		}
		redirect(year + "/scout/", parameters);
	}, 500);
}

var startHub = function() {
	$("#body").fadeOut(500);
	setTimeout(function() {
		redirect(year + "/hub/", {user: main.user, pass: main.pass});
	}, 500);
}
