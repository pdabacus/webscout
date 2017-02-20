#!/usr/bin/python3

import sys
import signal
import socket
import threading
import json

def kill(signal, frame):
	print()
	print("Killing Program")
	print("Closing Socket...", end="")
	serversock.shutdown(socket.SHUT_RDWR)
	serversock.close()
	print("done")
	sys.exit(0)

def process(data):
	if not ("action" in data):
		return None

	action = data["action"]

	if action == "test":
		response = {"success" : True}
		return response

	elif action == "login":
		response = {"success" : True, "login" : False}
		if "user" in data and "pass" in data:
			username = data["user"]
			password = data["pass"]
			if username == password:
				response["login"] = True
		else:
			response["success"] = False
		return response

	elif action == "create_account":
		pass

	elif action == "delete_account":
		pass

	elif action == "change_password":
		pass

	elif action == "create_file":
		pass

	elif action == "delete_file":
		pass

	elif action == "get_file":
		pass

	elif action == "set_file":
		pass

	return None

def handler(clientsock, addr):
	while 1:
		input_data = clientsock.recv(buffersize);
		if not input_data:
			break
		response = process(json.loads(input_data))
		response_json = json.dumps(response)
		clientsock.send(response_json.encode("utf-8"))
	clientsock.close()


if __name__ == "__main__":
	signal.signal(signal.SIGINT, kill)
	host = 'localhost'
	port = 8080
	buffersize = 65535

	serversock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	serversock.bind((host, port))
	serversock.listen(5)
	print("Starting Server")

	while True:
		print("waiting...", end="", flush=True)
		clientsock, addr = serversock.accept()
		print("connected from: '" + str(addr[0]) + ":" + str(addr[1]) + "'")
		t = threading.Thread(target=handler, args=(clientsock, addr), daemon=True)
		t.start()

