#!/usr/bin/python3

from Record import *
from AccountSystem import *

import datetime

class Processor:
	__accounts = AccountSystem.open("passwd")

	def __init__(self, acc=AccountSystem.open("passwd")):
		self.__accounts = acc

	def __log(self, msg):
		date = datetime.date.strftime(datetime.datetime.today().date(),"%Y-%m-%d")
		time = datetime.time.strftime(datetime.datetime.now().time(), "%H:%M:%S")
		print(date + " " + time + " >> " + msg)

	def __get_missing_data(self, data, keys):
		missing = []
		error = False
		for key in keys:
			if not key in data:
				error = True
				missing += [key]
		if error:
			return "'" + "' and '".join(missing) + "' undefined"
		return None

	def __get_auth_problems(self, username, password):
		u = self.__accounts.getUser(username)
		if u:
			if u.checkPass(password):
				return None
			else:
				return "password incorrect"
		else:
			return "could not find user with username '" + username + "'"

	def process(self, data):
		if not ("action" in data):
			return None

		action = data["action"]

		if action == "test":
			response = {"valid" : True, "test" : True}
			return response

		elif action == "login":
			response = {"valid" : True, "login" : False}
			username = ""
			missing_data = self.__get_missing_data(data, ["user", "pass"])
			if not missing_data:
				username = data["user"]
				password = data["pass"]
				auth_problems = self.__get_auth_problems(username, password)
				if not auth_problems:
					response["login"] = True
				else:
					response["error"] = auth_problems
			else:
				response["valid"] = False
				response["error"] = missing_data
			self.__log("login " + username + ": " + str(response["login"]))
			return response

		elif action == "create_account":
			response = {"valid" : True, "create_account" : False}
			username = ""
			missing_data = self.__get_missing_data(data, ["user", "pass"])
			if not missing_data:
				username = data["user"]
				password = data["pass"]
				files = []
				if "files" in data and type(data["files"]) == type(files):
					files = data["files"]
				u = self.__accounts.getUser(username)
				if not u:
					self.__accounts.addUser(User(username, password, files))
					response["create_account"] = True
					self.__accounts.save()
				else:
					response["error"] = "account already exists"
			else:
				response["valid"] = False
				response["error"] = missing_data
			self.__log("create_account " + username + ": " + str(response["create_account"]))
			return response

		elif action == "delete_account":
			response = {"valid" : True, "delete_account" : False}
			username = ""
			missing_data = self.__get_missing_data(data, ["user", "pass"])
			if not missing_data:
				username = data["user"]
				password = data["pass"]
				auth_problems = self.__get_auth_problems(username, password)
				if not auth_problems:
					self.__accounts.removeUser(username)
					response["delete_account"] = True
					self.__accounts.save()
				else:
					response["error"] = auth_problems
			else:
				response["valid"] = False
				response["error"] = missing_data
			self.__log("delete_account " + username + ": " + str(response["delete_account"]))
			return response

		elif action == "change_password":
			response = {"valid" : True, "change_password" : False}
			username = ""
			missing_data = self.__get_missing_data(data, ["user", "pass", "newpass"])
			if not missing_data:
				username = data["user"]
				password = data["pass"]
				newpass = data["newpass"]
				auth_problems = self.__get_auth_problems(username, password)
				if not auth_problems:
					u = self.__accounts.getUser(username)
					u.setPass(newpass)
					self.__accounts.addUser(u)
					self.__accounts.save()
					response["change_password"] = True
				else:
					response["error"] = auth_problems
			else:
				response["valid"] = False
				response["error"] = missing_data
			self.__log("change_password " + username + ": " + str(response["change_password"]))
			return response

		elif action == "create_file":
			response = {"valid" : True, "create_file" : False}
			username = ""
			missing_data = self.__get_missing_data(data, ["user", "pass", "file"])
			if not missing_data:
				username = data["user"]
				password = data["pass"]
				file = data["file"]
				auth_problems = self.__get_auth_problems(username, password)
				if not auth_problems:
					u = self.__accounts.getUser(username)
					if not file in u.getFiles():
						u.addFile(file)
						self.__accounts.addUser(u)
						self.__accounts.save()
						response["create_file"] = True
					else:
						response["error"] = "file '" + file + "' already exists"
				else:
					response["error"] = auth_problems
			else:
				response["valid"] = False
				response["error"] = missing_data
			self.__log("create_file " + username + ": " + str(response["create_file"]))
			return response

		elif action == "delete_file":
			response = {"valid" : True, "delete_file" : False}
			username = ""
			missing_data = self.__get_missing_data(data, ["user", "pass", "file"])
			if not missing_data:
				username = data["user"]
				password = data["pass"]
				file = data["file"]
				auth_problems = self.__get_auth_problems(username, password)
				if not auth_problems:
					u = self.__accounts.getUser(username)
					if file in u.getFiles():
						u.removeFile(file)
						self.__accounts.addUser(u)
						self.__accounts.save()
						response["delete_file"] = True
					else:
						response["error"] = "file '" + file + "' does not exist"
				else:
					response["error"] = auth_problems
			else:
				response["valid"] = False
				response["error"] = missing_data
			self.__log("delete_file " + username + ": " + str(response["delete_file"]))
			return response

		elif action == "get_file_list":
			response = {"valid" : True, "get_file_list" : False}
			username = ""
			missing_data = self.__get_missing_data(data, ["user", "pass"])
			if not missing_data:
				username = data["user"]
				password = data["pass"]
				auth_problems = self.__get_auth_problems(username, password)
				if not auth_problems:
					response["file_list"] = self.__accounts.getUser(username).getFiles()
					response["get_file_list"] = True
				else:
					response["error"] = auth_problems
			else:
				response["valid"] = False
				response["error"] = missing_data
			self.__log("get_file_list " + username + ": " + str(response["get_file_list"]))
			return response

		elif action == "get_file":
			response = {"valid" : True, "get_file" : False}
			username = ""
			missing_data = self.__get_missing_data(data, ["user", "pass", "file"])
			if not missing_data:
				username = data["user"]
				password = data["pass"]
				file = data["file"]
				auth_problems = self.__get_auth_problems(username, password)
				if not auth_problems:
					if file in self.__accounts.getUser(username).getFiles():
						response["file_content"] = str(Record.open(username, file))
						response["get_file"] = True
					else:
						response["error"] = "file '" + file + "' does not exist"
				else:
					response["error"] = auth_problems
			else:
				response["valid"] = False
				response["error"] = missing_data
			self.__log("get_file " + username + ": " + str(response["get_file"]))
			return response

		elif action == "set_file":
			response = {"valid" : True, "set_file" : False}
			username = ""
			missing_data = self.__get_missing_data(data, ["user", "pass", "file", "file_content"])
			if not missing_data:
				username = data["user"]
				password = data["pass"]
				file = data["file"]
				file_content = data["file_content"]
				auth_problems = self.__get_auth_problems(username, password)
				if not auth_problems:
					if file in self.__accounts.getUser(username).getFiles():
						Record.decodeJSON(username, file_content, file).save()
						response["set_file"] = True
					else:
						response["error"] = "file '" + file + "' does not exist"
				else:
					response["error"] = auth_problems
			else:
				response["valid"] = False
				response["error"] = missing_data
			self.__log("set_file " + username + ": " + str(response["set_file"]))
			return response

		elif action == "get_match":
			response = {"valid" : True, "get_match" : False}
			username = ""
			missing_data = self.__get_missing_data(data, ["user", "pass", "file", "match_type", "match_number"])
			if not missing_data:
				username = data["user"]
				password = data["pass"]
				file = data["file"]
				match_type = data["match_type"]
				match_number = data["match_number"]
				auth_problems = self.__get_auth_problems(username, password)
				if not auth_problems:
					if file in self.__accounts.getUser(username).getFiles():
						response["match_content"] = str(Record.open(username, file).getMatch(match_type, match_number))
						response["get_match"] = True
					else:
						response["error"] = "file '" + file + "' does not exist"
				else:
					response["error"] = auth_problems
			else:
				response["valid"] = False
				response["error"] = missing_data
			self.__log("get_match " + username + ": " + str(response["get_match"]))
			return response

		elif action == "set_match":
			response = {"valid" : True, "set_match" : False}
			username = ""
			missing_data = self.__get_missing_data(data, ["user", "pass", "file", "match_type", "match_number", "match_content"])
			if not missing_data:
				username = data["user"]
				password = data["pass"]
				file = data["file"]
				match_type = data["match_type"]
				match_number = data["match_number"]
				match_content = data["match_content"]
				auth_problems = self.__get_auth_problems(username, password)
				if not auth_problems:
					if file in self.__accounts.getUser(username).getFiles():
						r = Record.open(username, file)
						r.addMatch(Match.decodeJSON(match_type, match_number, match_content))
						r.save()
						response["set_match"] = True
					else:
						response["error"] = "file '" + file + "' does not exist"
				else:
					response["error"] = auth_problems
			else:
				response["valid"] = False
				response["error"] = missing_data
			self.__log("set_match " + username + ": " + str(response["set_match"]))
			return response

		elif action == "get_robot":
			response = {"valid" : True, "get_robot" : False}
			username = ""
			missing_data = self.__get_missing_data(data, ["user", "pass", "file", "match_type", "match_number", "alliance_color", "alliance_number"])
			if not missing_data:
				username = data["user"]
				password = data["pass"]
				file = data["file"]
				match_type = data["match_type"]
				match_number = data["match_number"]
				alliance_color = data["alliance_color"]
				alliance_number = data["alliance_number"]
				auth_problems = self.__get_auth_problems(username, password)
				if not auth_problems:
					if file in self.__accounts.getUser(username).getFiles():
						r = Record.open(username, file)
						m = r.getMatch(match_type, match_number)
						if m:
							response["robot_content"] = str(m.getRobot(alliance_color, alliance_number))
							response["get_robot"] = True
						else:
							response["error"] = "match '" + match_type + "' '" + match_number + "' does not exist"
					else:
						response["error"] = "file '" + file + "' does not exist"
				else:
					response["error"] = auth_problems
			else:
				response["valid"] = False
				response["error"] = missing_data
			self.__log("get_robot " + username + ": " + str(response["get_robot"]))
			return response

		elif action == "set_robot":
			response = {"valid" : True, "set_robot" : False}
			username = ""
			missing_data = self.__get_missing_data(data, ["user", "pass", "file", "match_type", "match_number", "alliance_color", "alliance_number", "robot_content"])
			if not missing_data:
				username = data["user"]
				password = data["pass"]
				file = data["file"]
				match_type = data["match_type"]
				match_number = data["match_number"]
				alliance_color = data["alliance_color"]
				alliance_number = data["alliance_number"]
				robot_content = data["robot_content"]
				auth_problems = self.__get_auth_problems(username, password)
				if not auth_problems:
					if file in self.__accounts.getUser(username).getFiles():
						r = Record.open(username, file)
						m = r.getMatch(match_type, match_number)
						if m:
							m.setRobot(alliance_color, alliance_number, Robot.decodeJSON(robot_content))
							r.addMatch(m)
							r.save()
							response["set_robot"] = True
						else:
							response["error"] = "match '" + match_type + "' '" + match_number + "' does not exist"
					else:
						response["error"] = "file '" + file + "' does not exist"
				else:
					response["error"] = auth_problems
			else:
				response["valid"] = False
				response["error"] = missing_data
			self.__log("set_robot " + username + ": " + str(response["set_robot"]))
			return response

		return {"valid" : False, "error" : "'action' undefined"}
