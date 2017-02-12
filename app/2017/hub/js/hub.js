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
	html += '<div class="col-sm-1 col-md-2"></div>';
	html += '<div id="page" class="col-xs-12 col-sm-10 col-md-8">';
	html += '<h1>Stronghold 2017 Scouting Hub</h1>';
	html += '<h4>asdf</h4>';
	html += '</div>';
	html += '<div class="col-sm-1 col-md-2"></div>';
	html += '</div>';

	transitionElement("body", html, 500);

});
