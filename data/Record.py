#!/usr/bin/python3

import os
import json

def turner(arg, ret1, ret2):
	if arg:
		return ret1
	return ret2

class Robot:
	__team = 0
	__scouted = False
	__shoot_high = 0
	__shoot_low = 0
	__place_gear = 0
	__climb_rope = False
	__fell_over = False
	__comment = ""

	def __init__(self, t, s=False, h=0, l=0, p=0, r=False, f=False, c=""):
		self.__team = t
		self.__scouted = s
		self.__shoot_high = h
		self.__shoot_low = l
		self.__place_gear = p
		self.__climb_rope = r
		self.__fell_over = f
		self.__comment = c

	@staticmethod
	def decodeJSON(data):
		if type(data) == type(""):
			data = json.loads(data)
		if len(data) < 2:
			return Robot(0)
		elif len(data) < 7:
			return Robot(data["team"], data["scouted"])
		else:
			return Robot(
				data["team"],
				data["scouted"],
				data["high"],
				data["low"],
				data["gear"],
				data["rope"],
				data["fall"],
				data["comment"]
			)

	def __repr__(self):
		s = ""
		s += '{'
		s += '"team":' + str(self.__team) + ','
		s += '"scouted":' + turner(self.__scouted, "true", "false")
		if self.__scouted:
			s += ','
			s += '"high":' + str(self.__shoot_high) + ','
			s += '"low":' + str(self.__shoot_low) + ','
			s += '"gear":' + str(self.__place_gear) + ','
			s += '"rope":' + turner(self.__climb_rope, "true", "false") + ','
			s += '"fall":' + turner(self.__fell_over, "true", "false") + ','
			s += '"comment":"' + str(self.__comment) + '"'
		s += '}'

		return s

class Match:
	__type = "qual"
	__num = 0
	__red = {}
	__blue = {}

	def __init__(self, t, n, r, b):
		self.__type = turner(t == "qual", "qual", "elim")
		self.__num = n
		self.__red = {"1":Robot(r[0]), "2":Robot(r[1]), "3":Robot(r[2])}
		self.__blue = {"1":Robot(b[0]), "2":Robot(b[1]), "3":Robot(b[2])}

	@staticmethod
	def decodeJSON(t, n, data):
		m = Match(t, n, [0,0,0], [0,0,0])
		if type(data) == type(""):
			data = json.loads(data)
		if len(data) < 2:
			return m
		for color in data:
			for num in data[color]:
				m.setRobot(color, num, Robot.decodeJSON(data[color][num]))
		return m

	def __repr__(self):
		s = ""

		s += '{'
		s += '"red":'
		s += str(self.__red).replace(" ", "").replace("'",'"')

		s += ',"blue":'
		s += str(self.__blue).replace(" ", "").replace("'",'"')
		s += '}'

		if len(s) < 10:
			return ""
		return s

	def getType(self):
		return self.__type

	def getNum(self):
		return self.__num

	def getRobot(self, color, number):
		if color == "red" and str(number) in self.__red:
			return self.__red[str(number)]
		elif color == "blue" and str(number) in self.__blue:
			return self.__blue[str(number)]

	def setRobot(self, color, number, rob):
		if color == "red":
			self.__red[str(number)] = rob
		elif color == "blue":
			self.__blue[str(number)] = rob

class Record:
	__team = "0"
	__qual = {}
	__elim = {}
	__fileLocation = "record.json"

	def __init__(self, t, f="record.json"):
		self.__team = str(t)
		self.__qual = {}
		self.__elim = {}
		self.__fileName = f

	@staticmethod
	def decodeJSON(team, data, fileName="record.json"):
		r = Record(team, fileName)
		if type(data) == type(""):
			data = json.loads(data)
		if len(data) < 2:
			return r
		for t in data:
			for i in data[t]:
				r.addMatch(Match.decodeJSON(t, i, data[t][i]))
		return r

	@staticmethod
	def open(team, fileName="record.json"):
		data = ""
		fileLocation = os.path.join(str(team), fileName)
		if os.path.isfile(fileLocation):
			file = open(fileLocation, "r", encoding="utf-8", newline="")
			data = file.read()
			file.close()

		r = Record(team, fileName)
		if len(data) < 10:
			return r
		if type(data) == type(""):
			data = json.loads(data)
		if len(data) < 2:
			return r
		for t in data:
			for i in data[t]:
				r.addMatch(Match.decodeJSON(t, i, data[t][i]))
		return r

	def __repr__(self):
		s = ""

		s += '{'
		s += '"qual":{'
		for q in sorted(self.__qual.keys()):
			s += '"' + str(self.__qual[q].getNum()) + '":' + str(self.__qual[q]) + ','
		if len(self.__qual) > 0:
			s = s[:-1]
		s += '}'

		s += ',"elim":{'
		for e in sorted(self.__elim.keys()):
			s += '"' + str(self.__elim[e].getNum()) + '":' + str(self.__elim[e]) + ','
		if len(self.__elim) > 0:
			s = s[:-1]
		s += '}'
		s += '}'

		if len(s) < 10:
			return ""
		return s

	def addMatch(self, m):
		t = m.getType()
		if t == "qual":
			self.__qual[str(m.getNum())] = m
		elif t == "elim":
			self.__elim[str(m.getNum())] = m

	def removeMatch(self, t, i):
		if t == "qual" and str(i) in self.__qual:
			self.__qual.pop(str(i))
		elif t == "elim" and str(i) in self.__elim:
			self.__elim.pop(str(i))

	def getMatch(self, t, i):
		if t == "qual" and str(i) in self.__qual:
			return self.__qual[str(i)]
		elif t == "elim" and str(i) in self.__elim:
			return self.__elim[str(i)]

	def save(self):
		if not os.path.exists(self.__team):
			os.mkdir(self.__team)
		fileLocation = os.path.join(self.__team, self.__fileName)
		file = open(fileLocation, "w+", encoding="utf-8", newline="")
		file.write(str(self))
		file.close()

