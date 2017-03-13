$(document).ready(function() {
	$(".fadein").fadeIn(500);
	getFiles();
});

var openMatch = function(matchType, matchNumber) {
	var html = "";

	html += '<div class="row">';
	html += '<div class="col-xs-0 col-sm-2 col-md-3"></div>';
	html += '<div class="col-xs-6 col-sm-4 col-md-3">';
	html += '<h3>' + capitalize(matchType) + '</h3><hr/>';
	html += '</div><div class="col-xs-6 col-sm-4 col-md-3">';
	html += '<h3>' + matchNumber + '</h3><hr/>';
	html += '</div><div class="col-xs-0 col-sm-2 col-md-3"></div></div>';

	html += '<div class="row"><div class="col-xs-1 col-sm-2 col-md-3"></div>';
	html += '<div class="red border col-xs-5 col-sm-4 col-md-3">';
	for (var i = 1; i <= 3; i++) {
		html += '<input id="detail-r' + i + '"';
		html += ' class="textinput" type="number"'
		html += ' placeholder="Robot ' + i + '" value="';
		html += main.matches[matchType][matchNumber]["red"][i]["team"] + '"/>';
	}

	html += '</div><div class="blue border col-xs-5 col-sm-4 col-md-3">';
	for (var i = 1; i <= 3; i++) {
		html += '<input id="detail-b' + i + '"';
		html += ' class="textinput" type="number"'
		html += ' placeholder="Robot ' + i + '" value="';
		html += main.matches[matchType][matchNumber]["blue"][i]["team"] + '"/>';
	}

	html += '</div><div class="col-xs-1 col-sm-2 col-md-3"></div></div>';
	html += '<div style="margin: 20px 0px;"></div>';

	html += '<div class="row"><div id="update-match-error"></div>';
	html += '<div class="col-xs-2 col-md-4"></div>';
	html += '<div class="col-xs-8 col-md-4">';
	html += '<div class="button" onclick="';
	html += 'updateMatch(' + "'" + matchType + "'," + matchNumber + ')">';
	html += '<div>Update Match</div></div></div>';
	html += '<div class="col-xs-2 col-md-4"></div></div>';

	html += '<div style="margin: 20px 0px;"></div>';

	transitionElement("match-container", html, 400);
}

var getMatches = function() {
	main.action = "get_file"
	$.get("../../../php/get_data.php", main, function(data) {
		var error = "";
		if (data.length > 10) {
			response = JSON.parse(data);
			if (response.valid && response[main.action]) {
				main.matches = JSON.parse(response.file_content);
				var qual = "";
				var elim = "";

				for (var matchType in main.matches) {
					for (var matchNumber in main.matches[matchType]) {
						if (matchType == "qual" && matchNumber != null) {
							qual += '<p class="match-select" onclick="openMatch(';
							qual += "'qual'," + matchNumber + ')">';
							qual += matchNumber + "</p>";
						}
						if (matchType == "elim" && matchNumber != null) {
							elim += '<p class="match-select" onclick="openMatch(';
							elim += "'elim'," + matchNumber + ')">';
							elim += matchNumber + "</p>";
						}
					}
				}

				$("#qual").html(qual);
				$("#elim").html(elim);

			} else {
				console.log("match update error: " + response.error);
			}
		} else {
			console.log("match update: internal server error");
		}
	});
}

var getFiles = function() {
	main.action = "get_file_list"
	$.get("../../../php/get_data.php", main, function(data) {
		var error = "";
		if (data.length > 10) {
			response = JSON.parse(data);
			if (response.valid && response[main.action]) {
				main.files = response.file_list;
				var html = '<div class="row">';
				html += '<div class="col-xs-2"></div>';
				html += '<div class="col-xs-8" style="box-shadow: 1px 1px 5px #DDDDDD;">';
				html += '<h3>File List</h3><hr/>';

				for (var i = 0; i < main.files.length; i++) {
					html += '<p class="match-select" onclick="setFile(';
					html += "'" + main.files[i] + "'" + ')">' + main.files[i] + '</p>';
				}

				html += '<p></p></div><div class="col-xs-2"></div></div>';
				html += '<div style="margin: 20px 0px;"></div>';

				transitionElement("match-container", html, 400);

			} else {
				console.log("match update error: " + response.error);
			}
		} else {
			console.log("match update: internal server error");
		}
	});
}

var setFile = function(file) {
	main.file = file;
	var html = '<h3 style="margin: 15% 0px;">Load a match to see its details</h3>';
	transitionElement("match-container", html, 400);

	html = '<div class="col-xs-4 col-md-3"><div class="button" data-toggle="modal"';
	html += 'data-target="#create-match-modal"><div>Create Match</div></div></div>';
	html += '<div class="col-xs-4 col-md-4"><div class="button"'
	html += 'onclick="getMatches()"><div>Update "' + main.file + '"</div></div></div>';
	html += '<div class="col-xs-4 col-md-3"><div class="button" onclick="">';
	html += '<div>Pretty Button</div></div></div>';
	transitionElement("button-bar", html, 400);
	getMatches();
}

var createMatch = function() {
	var matchType = document.getElementById("match_type").value;
	var matchNumber = document.getElementById("match_number").value;
	var r1 = document.getElementById("r1").value;
	var r2 = document.getElementById("r2").value;
	var r3 = document.getElementById("r3").value;
	var b1 = document.getElementById("b1").value;
	var b2 = document.getElementById("b2").value;
	var b3 = document.getElementById("b3").value;

	var error = "";

	matchType = matchType.toUpperCase()[0];

	if (matchType == "E") {
		matchType = "elim";
	} else {
		if (matchType == "Q") {
			matchType = "qual";
		} else {
			error = errorHTML("invalid match type");
		}
	}

	if (matchNumber.length < 1 || 3 < matchNumber.length) {
		error += errorHTML("'" + matchNumber + "' is not a valid match number");
	}

	if (error == "") {
		error = setMatch(matchType, matchNumber, r1, r2, r3, b1, b2, b3);
	}

	$("#create-match-error").html(error);
}

var updateMatch = function(matchType, matchNumber) {
	var r1 = document.getElementById("detail-r1").value;
	var r2 = document.getElementById("detail-r2").value;
	var r3 = document.getElementById("detail-r3").value;
	var b1 = document.getElementById("detail-b1").value;
	var b2 = document.getElementById("detail-b2").value;
	var b3 = document.getElementById("detail-b3").value;

	var error = setMatch(matchType, matchNumber, r1, r2, r3, b1, b2, b3);

	if (error == "" || error == null) {
		error = "<h3>Updated Successfully</h3>";
	}

	$("#update-match-error").html(error);
}

var setMatch = function(matchType, matchNumber, r1, r2, r3, b1, b2, b3) {
	var robots = [r1, r2, r3, b1, b2, b3];
	var error = "";

	for (var i = 0; i < 6; i++) {
		if (robots[i].length < 2 || 6 < robots[i].length) {
			error += errorHTML("'" + robots[i] + "' is not a valid team number");
		}
	}

	if (error == "") {
		var matchContent = '{"red":{';
		for (var i = 1 ; i < 4; i++) {
			matchContent += '"' + i + '":{"scouted":false,"team":';
			matchContent += robots[i-1] + '},';
		}

		matchContent = matchContent.slice(0,-1) + '},"blue":{';

		for (var i = 1 ; i < 4; i++) {
			matchContent += '"' + i + '":{"scouted":false,"team":';
			matchContent += robots[i+2] + '},';
		}

		matchContent = matchContent.slice(0,-1) + '}}';

		var request = {
			user: main.user,
			pass: main.pass,
			file: main.file,
			match_type: matchType,
			match_number: matchNumber,
			match_content: matchContent,
			action: "set_match"
		};

		$.get("../../../php/get_data.php", request, function(data) {
			if (data.length > 10) {
				response = JSON.parse(data);
				if (response.valid && response[request.action]) {
					$("#create-match-modal").modal("hide");
					$("#create-match-error").html("<h3>Created Successfully</h3>");

					document.getElementById("match_type").value = "";
					document.getElementById("match_number").value = "";
					document.getElementById("r1").value = "";
					document.getElementById("r2").value = "";
					document.getElementById("r3").value = "";
					document.getElementById("b1").value = "";
					document.getElementById("b2").value = "";
					document.getElementById("b3").value = "";

					getMatches();
					return "";
				} else {
					return errorHTML(response.error);
				}
			} else {
				return errorHTML("internal server error");
			}
		});
	} else {
		return error;
	}
}
