# Design document
## Refugee history (not finished yet)

### Elements of the Visualisation

-> HTML

* CSS Stylesheet
* Map from datamaps (javascript)
* Script with main functions (d3; javascript)
	* Map configuration
	* Draws the arrows (dependent on year)
		* data (csv)
	* Opens tooltip if clicked on country and draws additional graphs
		* data (csv)

-> Van tevoren het midden van de landen berekenen
-> Pijlen tekenen op te svg van de kaart


### Sketches
TODO: drawings
-> Als je klikt op een land: vervaag alle pijlen, bahalve van en naar dat land (+ maak optie om van/naar in/uit te schakelen)

### Used APIs and Plugins
* D3.js
	* TopoJSON.js
* Datamaps.js

### Data Sources
* [UN data](http://data.un.org/Data.aspx?q=refugee&d=UNHCR&f=indID%3aType-Ref) | where from + to | 1975 - 2013
* more recent data would be nice


### Databases/Tables
* Table with UN refugee data (csv)
	Country of origin + destination; amount of refugees; year