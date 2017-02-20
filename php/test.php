<?php 


//setup socket
$host = "localhost";
$port = 8080;


$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

//connect to socket
socket_connect($socket, $host, $port);

//create data
$data = array(
    "user" => "4828",
    "pass" => "de3f712d1a02c5fb481a7a99b0da7fa3",
    "action" => 'auth'
);

$data["pass"] = "4828";

//encode data
$input = json_encode($data);

//send data
socket_send($socket, $input, strlen($input), MSG_EOF);

//get response
$output = socket_read($socket, 65535);

//decode response
$response = json_decode($output);

//show response
print_r($response);

//close socket
socket_close($socket);

?>
