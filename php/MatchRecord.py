#!/usr/bin/python3

class Match:
	__type
	__num
	__red
	__blue

	def __init__(t, n, r1, r2, r3, b1, b2, b3):
		self.__type = t
		self.__num = n
		self.__red = [r1, r2, r3]
		self.__blue = [b1, b2, b3]

	def __repr__(self):
		s = ""
		for r in self.__red:
			s += str(r)
		if len(s) < 2:
			return ""
		return s[:-1]

	def getType():
		return type

	def getNum():
		return num

	def getRed():
		return red

	def getBlue():
		return blue

class Record:
	pass


r = Record()

m = Match("qual", 22, 123,234,345,456,567,678)

print(m)

?>
