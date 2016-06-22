# Patrick Schilder

undata = open('filteredUNdata.csv', 'r')

undata.readline()

maxVal = 0
plotlist = []

for line in undata:
    line = line.split(",")
    try:
    	plotlist.append(int(line[3]))
    	if int(line[3]) > maxVal:
    		maxVal = int(line[3])
    except:
    	print line

print "Maximum amount of refugees = ", maxVal


import matplotlib.pyplot as plt
import numpy as np


plt.hist(plotlist, 2000)
plt.title("Histogram")
plt.xlabel("Value")
plt.ylabel("Frequency")



plt.show()