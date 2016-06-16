# Day 1
Written proposal

# Day 2
Looking which map to use for visualisation (one with countrynames already included and with zoom)

# Day 3
Writing design document and thinking on how to read the data.

# Day 4
Working on the look of the website (css) and added a slider for selecting the year (without function till now)

# Day 5
Finishing prototype and having presentation.

# Day 6
Preparing data: looking how the data deals with changed / new countries ; translating countries to a country code (3 letters) ; filtering data (make new csv with only the data I need)

# Day 7
started typing function to draw graph of total incoming refugees: first ordering data (by country; by year). Looked up how to draw arcs on the map (seems pretty easy because it is possible to do that by countrycode).

# Day 8
Did less then planned; worked on graph of total incomming refugees(removing old data; transitions)

# Day 9
Not available...

# Day 10
For the first time plotted all the arcs and.... discovered it is really slow (and arcs cover countries) Rest of the day: presentation

# Weekend
Change silder from hand-made d3 slider to html "range"

#Day 11
Data for map is processed with d3.nest by year. Arcs are only plotted if more than x refugees. Assigned a place (currently in the ocean) for refugees to/from "various"/"stateless" and assigned coordinates for Tibet.  Fixed all the issues with the history graph (axes).

# Day 12
Added second graph for outgoing refugees and changed colors for each graph.
Started working on pie chart / donut. End of the day: pie chart working (but not updating)

# Day 13
Tried to let the pie chart update. But because of the text on the slices, it seems inpossible :(
Started over again, and this time used an example from internet which already has text labels and also has and update function.

# Day 14
Because the solution for the pie chart yesterday has a part to "initialise" and a part to update (which needs to reach the variables from the init part), I tried to make a class for the pie chart, but D3 doesn't like it, so it is not possible.
In the end I made a function for the init part, which returns the SVG element, which then is stored in a variable, so the update function can use that. End of the day: 2 pie charts (->donut) working. (Only text from small slices overlaps)>