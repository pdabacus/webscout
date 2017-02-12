var orientation = 1;
var page = document.getElementById("page");

var setOrientation = function(i) {
	orientation = i;

	var clickedOrientation = document.getElementById("orientation" + i);
	var otherOrientation = document.getElementById("orientation" + (3-i));

	clickedOrientation.style.opacity = "1.0";
	otherOrientation.style.opacity = "0.70";
}

var scoutMatch = function() {
	page.innerHTML = "<p>asdf</p>";
}