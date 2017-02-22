<?php 

$host = "localhost";
$port = 8080;

function getData($data) {
	global $host, $port;

	$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
	socket_connect($socket, $host, $port);

	$input = json_encode($data);
	socket_send($socket, $input, strlen($input), MSG_EOF);

	$response = json_decode(socket_read($socket, 65535));
	socket_close($socket);

	return $response;
}

?>
