$(document).ready(function() {
	$(".fadein").fadeIn(500);
	getMatches();
});

var openMatch = function(matchType, matchNumber) {
	var html = "";
	html += "<p>" + matchType + "</p><p>" + matchNumber + "</p>";
	html += "<p>" + matchType + "</p><p>" + matchNumber + "</p>";
	html += "<p>" + matchType + "</p><p>" + matchNumber + "</p>";
	html += "<p>" + matchType + "</p><p>" + matchNumber + "</p>";
	html += "<hr/>"
	$("#match-container").html(html);

}

var getMatches = function() {
	var request = {
		user: main.user,
		pass: main.pass,
		file: "pitt.json",
		action: "get_file"
	};

	$.get("../../../php/get_data.php", request, function(data) {
		var error = "";
		if (data.length > 10) {
			response = JSON.parse(data);
			if (response.valid && response[request.action]) {
				console.log("didit");
				var matches = JSON.parse(response.file_content);
				var qual = "";
				var elim = "";

				for (var matchType in matches) {
					for (var matchNumber in matches[matchType]) {
						if (matchType == "qual") {
							qual += '<p class="match-select" onclick="openMatch(';
							qual += "'qual', " + matchNumber + ')">' + matchNumber + "</p>";
						}
						if (matchType == "elim") {
							elim += '<p class="match-select" onclick="openMatch(';
							qual += "'elim', " + matchNumber + ')">' + matchNumber + "</p>";
						}
					}
				}

				$("#qual").html(qual);
				$("#elim").html(elim);

			} else {
				console.log(response.error);
			}
		} else {
			console.log("internal server error");
		}
	});
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
		error += errorHTML("'" + matchNumber + "' is not a valid match number" );
	}

	var robots = [r1, r2, r3, b1, b2, b3];

	for (var i = 0; i < 6; i++) {
		if (robots[i].length < 2 || 6 < robots[i].length) {
			error += errorHTML("'" + robots[i] + "' is not a valid team number" );
		}
	}

	$("#create-match-error").html(error);

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

		console.log(matchContent);

		var request = {
			user: main.user,
			pass: main.pass,
			file: "pitt.json",
			match_type: matchType,
			match_number: matchNumber,
			match_content: matchContent,
			action: "set_match"
		};

		$.get("../../../php/get_data.php", request, function(data) {
			var error = "";
			if (data.length > 10) {
				response = JSON.parse(data);
				if (response.valid && response[request.action]) {
					console.log("didit");
					$("#create-match-modal").modal("hide");
				} else {
					console.log(response.error);
				}
			} else {
				console.log("internal server error");
			}
		});
	}
}