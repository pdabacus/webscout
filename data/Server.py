#!/usr/bin/python3

from Record import *
from AccountSystem import *

import sys
import signal
import socket
import threading
import json
import datetime

def log(msg):
	date = datetime.date.strftime(datetime.datetime.today().date(),"%Y-%m-%d")
	time = datetime.time.strftime(datetime.datetime.now().time(), "%H:%M:%S")
	print(date + " " + time + " >> " + msg)

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
		username = ""
		if "user" in data and "pass" in data:
			username = data["user"]
			password = data["pass"]
			u = accounts.getUser(username)
			if u:
				response["login"] = u.checkPass(password)
		else:
			response["success"] = False
			response["error"] = "'user' or 'pass' undefined"
		log("login " + username + ": " + str(response["login"]))
		return response

	elif action == "create_account":
		response = {"success" : True, "create_account" : False}
		username = ""
		if "user" in data and "pass" in data:
			username = data["user"]
			password = data["pass"]
			files = []
			if "files" in data and type(data["files"]) == type(files):
				files = data["files"]
			u = accounts.getUser(username)
			if not u:
				accounts.addUser(User(username, password, files))
				response["create_account"] = True
				accounts.save()
		else:
			response["success"] = False
			response["error"] = "'user' or 'pass' undefined"
		log("create_account " + username + ": " + str(response["create_account"]))
		return response

	elif action == "delete_account":
		response = {"success" : True, "delete_account" : False}
		username = ""
		if "user" in data and "pass" in data:
			username = data["user"]
			password = data["pass"]
			u = accounts.getUser(username)
			if u and u.checkPass(password):
				accounts.removeUser(username)
				response["delete_account"] = True
				accounts.save()
		else:
			response["success"] = False
			response["error"] = "'user' or 'pass' undefined"
		log("delete_account " + username + ": " + str(response["delete_account"]))
		return response

	elif action == "change_password":
		response = {"success" : True, "change_password" : False}
		username = ""
		if "user" in data and "pass" in data and "newpass" in data:
			username = data["user"]
			password = data["pass"]
			newpass = data["newpass"]
			u = accounts.getUser(username)
			if u and u.checkPass(password):
				u.setPass(newpass)
				accounts.addUser(u)
				response["change_password"] = True
				accounts.save()
		else:
			response["success"] = False
			response["error"] = "'user' or 'pass' or 'newpass' undefined"
		log("change_password " + username + ": " + str(response["change_password"]))
		return response

	elif action == "create_file":
		response = {"success" : True, "create_file" : False}
		username = ""
		if "user" in data and "pass" in data and "file" in data:
			username = data["user"]
			password = data["pass"]
			file = data["file"]
			u = accounts.getUser(username)
			if u and u.checkPass(password) and not file in u.getFiles():
				u.addFile(file)
				accounts.addUser(u)
				response["create_file"] = True
				accounts.save()
		else:
			response["success"] = False
			response["error"] = "'user' or 'pass' or 'file' undefined"
		log("create_file " + username + ": " + str(response["create_file"]))
		return response

	elif action == "delete_file":
		response = {"success" : True, "delete_file" : False}
		username = ""
		if "user" in data and "pass" in data and "file" in data:
			username = data["user"]
			password = data["pass"]
			file = data["file"]
			u = accounts.getUser(username)
			if u and u.checkPass(password) and file in u.getFiles():
				u.removeFile(file)
				accounts.addUser(u)
				response["delete_file"] = True
				accounts.save()
		else:
			response["success"] = False
			response["error"] = "'user' or 'pass' or 'file' undefined"
		log("delete_file " + username + ": " + str(response["delete_file"]))
		return response

	elif action == "get_file":
		response = {"success" : True, "get_file" : False}
		username = ""
		if "user" in data and "pass" in data and "file" in data:
			username = data["user"]
			password = data["pass"]
			file = data["file"]
			u = accounts.getUser(username)
			if u and u.checkPass(password) and file in u.getFiles():
				response[file] = u.getFile(file)
				response["get_file"] = True
		else:
			response["success"] = False
			response["error"] = "'user' or 'pass' or 'file' undefined"
		log("get_file " + username + ": " + str(response["get_file"]))
		return response

	elif action == "get_file_list":
		response = {"success" : True, "get_file_list" : False}
		username = ""
		if "user" in data and "pass" in data:
			username = data["user"]
			password = data["pass"]
			u = accounts.getUser(username)
			if u and u.checkPass(password):
				response["list"] = u.getFiles()
				response["get_file_list"] = True
		else:
			response["success"] = False
			response["error"] = "'user' or 'pass' undefined"
		log("get_file_list " + username + ": " + str(response["get_file_list"]))
		return response

	elif action == "set_file":
		response = {"success" : True, "set_file" : False}
		username = ""
		if "user" in data and "pass" in data and "file" in data and "file_content" in data:
			username = data["user"]
			password = data["pass"]
			file = data["file"]
			file_content = data["file_content"]
			u = accounts.getUser(username)
			if u and u.checkPass(password) and file in u.getFiles():
				Record.decodeJSON(username, file_content, file).save()
				response["set_file"] = True
		else:
			response["success"] = False
			response["error"] = "'user' or 'pass' or 'file' or 'file_content' undefined"
		log("set_file " + username + ": " + str(response["set_file"]))
		return response

	elif action == "set_match":
		response = {"success" : True, "set_match" : False}
		username = ""
		if "user" in data and "pass" in data and "file" in data and "match_content" in data:
			username = data["user"]
			password = data["pass"]
			file = data["file"]
			match_content = data["match_content"]
			u = accounts.getUser(username)
			if u and u.checkPass(password) and file in u.getFiles():
				Record.decodeJSON(username, file_content, file).save()
				response["set_match"] = True
		else:
			response["success"] = False
			response["error"] = "'user' or 'pass' or 'file' or 'match_content' undefined"
		log("set_match " + username + ": " + str(response["set_match"]))
		return response


	return {"success" : False, "error" : "'action' undefined"}

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

	accounts = AccountSystem.open("passwd")

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

