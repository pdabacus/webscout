var transitionElement = function(elem, html, time) {
		var el = $("#" + elem);

		el.fadeOut(time);
		setTimeout(function() {
			el.html(html);
			el.fadeIn(time);
		}, time);
}

var errorHTML = function(msg) {
	return '<h4 style="color: #FF3344">ERROR: ' + msg + '</h4>';
}

var capitalize = function(str) {
	return str.substring(0,1).toUpperCase() + str.substring(1);
}
