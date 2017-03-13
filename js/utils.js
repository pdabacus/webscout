var transitionElement = function(elem, html, time) {
		var el = $("#" + elem);

		el.fadeOut(time);
		setTimeout(function() {
			el.html(html);
			el.fadeIn(time);
		}, time);
}

var redirect = function(location, params) {
		var form = '';
		$.each(params, function(key, value) {
			form += '<input type="hidden" name="' + key + '" value="' + value + '">';
		});
		$('<form action="' + location + '" method="post">' + form + '</form>').appendTo('body').submit();
}

var errorHTML = function(msg) {
	if (msg == "" || msg == null) {
		return "";
	}
	return '<h4 style="color: #FF3344">ERROR: ' + msg + '</h4>';
}

var capitalize = function(str) {
	return str.substring(0,1).toUpperCase() + str.substring(1);
}
