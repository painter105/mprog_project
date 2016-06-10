# Patrick Schilder
# This script saves only the data that will be used in the visualisation


undata = open('UNdata.csv', 'r')
codes = open('countrycodes.csv', 'r')
output = open("filteredUNdata.csv", "w")

ccdict = {}
ccdict['Afghanistan'] = 'AFG' #Dit is de eerste waarde van de lijst met landen en wordt verkeerd ingelezen...


for line in codes:
    line = line.split(";")
    ccdict[line[0]] = line[1][:-1]


for line in undata:
    line = line.split(",")
    try:
        line[0] = ccdict[line[0][1:-1] ]
        line[1] = ccdict[line[1][1:-1] ]
    except:
        if line[1] in ['"Various"', '"Stateless"']:
            continue
        if line[0] == '"Various"':
            continue
        if line[0] == '"fnSeqID"': #einde van de datafile
            break

        print line[0],line[1]

    output.write( line[0] + ',' + line[1] + ',' + line [2][1:-1] + ',' + line [5][1:-1] + '\n' ) # [1:-1}] is om de "" haakjes weg te halen.