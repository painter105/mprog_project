## Week 1
# Day 1
Written proposal

# Day 2
Looking which map to use for visualisation (one with countrynames already included and with zoom). After being in doubt between google maps API and datamaps, finally chose datamaps.

# Day 3
Writing design document and thinking on how to read in the data.

# Day 4
Working on the look of the website (css) and added a slider for selecting the year (not functioning till now)

# Day 5
Finishing prototype and having presentation.

##Week 2
# Day 6
Preparing data: looking how the data deals with changed / new countries ; translating countries to a country code (3 letters) ; filtering data (make new csv with only the data I need: the total of persons recognized as refugees under the 1951 UN Convention/1967 Protocol as well as people in refugee-like situations)

# Day 7
Started typing function to draw graph of total incoming refugees: first ordering data (by country; by year).
Also looked up how to draw arcs on the map (seems pretty easy because it is possible to do that by country code).

# Day 8
Did less then planned; worked on graph of total incoming refugees(removing old data; transitions)

# Day 9
Not present...

# Day 10
For the first time plotted all the arcs and.... discovered it is really slow (and arcs cover countries) Rest of the day: presentation

## Week 3
# Weekend
Changed silder from self-defined d3 slider to html "range".

#Day 11
Data for map is processed with d3.nest by year. Arcs are only plotted if more than x refugees. Assigned a place (currently in the ocean) for refugees to/from "various"/"stateless" and assigned coordinates for Tibet.  Fixed all the issues with the history graph (axes).

# Day 12
Added second graph for outgoing refugees and changed colours for each graph.
Started working on donut chart. End of the day: donut chart working (but not updating)

# Day 13
Tried to let the donut chart update. But because of the text on the slices, it seems inpossible :(
Started over again, and this time used an example from internet which already has text labels and also has and update function.

# Day 14
Because the solution for the pie chart yesterday has a part to "initialise" and a part to update (which needs to reach the variables from the init part), I tried to make a class for the pie chart, but D3 doesn't like it, so it is not possible.
In the end I made a function for the init part, which returns the SVG element, which then is stored in a variable, so the update function can use that. End of the day: 2 donut charts working. (Only text from small slices overlaps)

# Day 15
Changed slider to d3.slider, because of axes and consistent look in different browsers.
Made the donut update not only when other country is selecteed, but also when the slider is changed to another year.

# Weekend
Change relation map:graphs from 8:4 to 7:5, so there is more space for donut(+text). Displaying full country names now in donut. Changed colours of slider, so it is more outstanding.

##Week 4

# Day 16
In donut, if countries have a too small contribution, they are grouped into the "Various" slice.

# Day 17
Changed function drawArcs; now, arcs from the clicked country are drawn with colours (green/red depending on incoming/outgoing). The remaining arcs are black and there is a checkbox to turn them off/on.

# Day 18
Made tooltip for donut; added a "various countries" bubble; thickness of arcs is now divided in categories.
Moved checkbox upward and renamed to "focus on checkbox". The checkbox is always visible now, independent of the selected tab.

# Day 19
Writing the report and applying the final touch to the visualisations.