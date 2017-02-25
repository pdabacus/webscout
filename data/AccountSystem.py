#!/usr/bin/python3

from Record import *

import os
import csv

class User:
	__name = ""
	__pass = ""
	__files = []

	def __init__(self, n, p, f=[]):
		self.__name = str(n)
		self.__pass = p
		self.__files = sorted(set(f))

	def __repr__(self):
		s = self.__name + ","
		s += self.__pass
		for f in self.__files:
			s += "," + f
		return s

	def getName(self):
		return self.__name

	def getFiles(self):
		return self.__files

	def checkPass(self, p):
		return p == self.__pass

	def setPass(self, p):
		self.__pass = p

	def addFile(self, f):
		self.__files = sorted(set(self.__files + [f]))
		Record.open(self.__name, f).save()

	def removeFile(self, f):
		if f in self.__files:
			self.__files.pop(self.__files.index(f))
			os.remove(os.path.join(str(self.__name), f))

class AccountSystem:
	__users = {}
	__passwd = ""

	def __init__(self, p="passwd"):
		self.__users = {}
		self.__passwd = p

	@staticmethod
	def open(p="passwd"):
		a = AccountSystem(p)
		if os.path.isfile(p):
			file = open(p, "r", encoding="utf-8", newline="")
			for line in csv.reader(file, delimiter = ","):
				if len(line) > 1:
					u = line[0]
					p = line[1]
					f = []
					if len(line) > 2:
						f = line[2:]
					a.addUser(User(u, p, f))
			file.close()
		return a

	def __repr__(self):
		s = ""
		for user in sorted(self.__users.keys()):
			s += str(self.__users[user]) + "\n"
		return s

	def addUser(self, u):
		self.__users[u.getName()] = u

	def removeUser(self, name):
		if str(name) in self.__users:
			self.__users.pop(str(name))

	def getUser(self, name):
		if str(name) in self.__users:
			return self.__users[str(name)]
		return None

	def save(self):
		file = open(self.__passwd, "w+", encoding="utf-8", newline="")
		file.write(str(self))
		file.close()

