# Movement of refugees

I want to make a visualisation where people can see an overview of where refugees are coming from and where they are going to. I want the visualisation to be of the whole world (and not only the part with the most refugees). This way the visualisation can be used also after a couple of year when perhaps there will be another movement of refugees.

The visualisation should be an interactive map of the whole planet, where movement of refugees is visable as a kind of arrows between countries. Like on the sketch beneath.

![](doc/first_skecth.png)

I will need data on numbers of refugees, where they’re from and where they go to. Sources: UN and similar. If there is irrelevant information, then first filter it out. Store the data as csv or JSON.

Certainly this parts will be needed:

  * Map (I will have to find one on the web)
  * code that connects the numbers with the locations on the map
  * code that draws flows between different countries (like flight routes from airplanes)
  * code that opens a new window with detailed information and history about a refugee-stream / country together with a visualisation.

To make the visualisation I plan to use d3. If possible (=not too hard), I would like to use a 3D map of the globe. Otherwise I will use a 2D map that connects at the edges and repeats.

A similar visualisation is, for example [from the UNHCR](http://data.unhcr.org/mediterranean/country.php?id=502) Refugee "flows" are very detailed here. A resanable small area is presented, and the the estimated daily refugee arrivals are shown. I want to visualise the movement of refugees on the whole planet and use yearly numbers and show - apart from the actual happenings - also the historical aspect.