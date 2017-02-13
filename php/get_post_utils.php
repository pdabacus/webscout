	<?php

//checks if either the get or post variable is set
function getpostset($var) {
	return isset($_GET[$var]) || isset($_POST[$var]);
}

//returns the get variable or the post variable or null
function getpost($var) {
	if (isset($_GET[$var])) {
		return $_GET[$var];
	}
	elseif (isset($_POST[$var])) {
		return $_POST[$var];
	}
	else {
		return NULL;
	}
}

?>
