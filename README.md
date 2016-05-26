# Titel

-what problem will be solved for the user
Overview of where refugees are coming from and where they are going to.
-what features will be available to solve the problem
Interactive map
-an overview sketch of what the application will look like for the user; if you envision the application to have multiple screens, sketch these all out
Map with refugee-streams between countries. At every stream/country: detailed information and history
-what data sets and data sources will you need, how you will get the data into the right form for your app
Need data on numbers of refugees, where they’re from and where they go to. Sources: UN and similar. If there is irrelevant information, then first filter it out.
-what separate parts of the application can be defined (decomposing the problem) and how these should work together
*Map
*code that connects the numbers with the locations on the map
*code that draws flows between different countries (like flight routes from airplanes)
*code that opens a new window with detailed information and history about a refugee-stream / country together with a visualisation.
-what external components (APIs) you need to make certain features possible
I certainly need a map and I want to use d3 to make the visualisation.
-technical problems or limitations that could arise during development and what possibilities you have to overcome these
Zooming in on the map
-a review of similar applications or visualizations in terms of features and technical aspects (what do they offer? how have they implemented it?)
(http://data.unhcr.org/mediterranean/regional.php) Refugee streams only regional. Other visualisations are bigger without the streams.