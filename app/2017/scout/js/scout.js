var transitionElement = function(elem, html, time) {
		var el = $("#" + elem);

		el.fadeOut(time);
		setTimeout(function() {
			el.html(html);
			el.fadeIn(time);
		}, time);
}

$(document).ready(function() {

	var html = '<div class="container-fluid" style="text-align: center;">';
	html += '<div class="col-xs-1 col-sm-2 col-md-3"></div>';
	html += '<div class="col-xs-10 col-sm-8 col-md-6" style="margin: 40px auto">';
	html += '<h1>Orientation ' + main.orientation + ' Selected</h1>';
	html += '</div>';
	html += '<div class="col-xs-1 col-sm-2 col-md-3"></div>';
	html += '</div>';

	transitionElement("body", html, 500);

});