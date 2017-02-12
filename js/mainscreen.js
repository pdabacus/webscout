var orientation = 1;

var setOrientation = function(i) {
	orientation = i;

	var clickedOrientation = document.getElementById("orientation" + i);
	var otherOrientation = document.getElementById("orientation" + (3-i));

	clickedOrientation.style.opacity = "1.0";
	otherOrientation.style.opacity = "0.70";
}

var scoutMatch = function() {
	var body = document.getElementById("body");
	$("#body").fadeOut(1000);
	setTimeout(function() {
		body.innerHTML = "<p>orientation" + orientation + "</p>";
		$("#body").fadeIn(1000);
	},1000);
	

}