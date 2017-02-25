#!/usr/bin/python3

from AccountSystem import *
from Processor import *

import sys
import signal
import socket
import threading
import json

def kill(signal, frame):
	print()
	print("Killing Program")
	print("Stopping Server...", end="")
	serversock.shutdown(socket.SHUT_RDWR)
	serversock.close()
	print("done")
	sys.exit(0)

def handler(clientsock, addr):
	while True:
		input_data = clientsock.recv(buffersize);
		if not input_data:
			break
		response = processor.process(json.loads(input_data))
		response_json = json.dumps(response)
		clientsock.send(response_json.encode("utf-8"))
	clientsock.close()

if __name__ == "__main__":
	signal.signal(signal.SIGINT, kill)

	host = 'localhost'
	port = 8080
	buffersize = 65535

	accounts = AccountSystem.open("passwd")
	processor = Processor(accounts)

	print("Starting Server")
	serversock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	serversock.bind((host, port))
	serversock.listen(5)

	while True:
		#print("waiting...", end="", flush=True)
		clientsock, addr = serversock.accept()
		#print("connected from: '" + str(addr[0]) + ":" + str(addr[1]) + "'")
		t = threading.Thread(target=handler, args=(clientsock, addr), daemon=True)
		t.start()

