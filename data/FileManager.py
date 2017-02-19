#!/usr/bin/python3

from Record import *
from AccountSystem import *

r = Record.open(4828, "worlds.json")
r.addMatch(Match("qual", 1, [1,2,3], [4,5,6]))
print(r)
print()

a = AccountSystem.open("passwd")
a.addUser(User("4828", "de3f712d1a02c5fb481a7a99b0da7fa3"))
print(a)