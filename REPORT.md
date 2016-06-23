# Report
*By Patrick Schilder - 10353488*

++Table of contents++

[TOC]


### Introduction

This project shows an overview of the movement of refugees on the whole planet, during different years. Statistics about individual countries are showed on the right side of the page. A screenshot is shown below in Figure 1.
    
![](doc/screenshot.png)
**Figure 1.** Screenshot with Germany selected to view more information.
    
### Visual Design

In this visualisation, the map is central. I chose to keep the map visible at all time. That means the whole project is not divided on multiple pages, but consists only of one page.
The map shows the whole world and is zoomable, so regions can be viewed in more detail. Between the countries where big amounts of refugees are moving, arcs are shown on the map. To be more precise, a movement of refugees is visible if the amount of refugees is greater then 20 000 people. I chose this number to keep the map readable, as most entries in te used data consist of rather small movements of refugees that are not particularly interesting to see, but would cover the whole map with arcs if they would be drawn.
If the user is interested to see incoming and outgoing refugees of a particular country in more detail, it is possible to check "Focus on country". This makes all the irrelevant arcs disappear and shows only the arcs connected to the selected country. Because there is more space on the map now, all the movements are now shown from 1000 refugees and greater. Incoming arcs have a green colour and outgoing refugees have a red colour.

To fit the other visualisations I used tabs on the right side of the map. The other visualisations are:
1. Bar charts with the total amount of refugees per year either entering or leaving the selected country.
2. Donut charts, which show the composition of the incoming refugees and outgoing refugees (the ones moving on to the next country).

### Technical Design

The webpage is made of the following components:

* HTML
	* uses bootstrap classes for tabs and for resizing on smaller devices
	* Checkbox to "Focus on selected country"
* Bootstrap CSS
* My own CSS Stylesheet
* SVG map from Datamaps
* Javaspcript with all functions
	* Map configuration
	* Reading in data from csv file and storing as global variable
	* Function that draws the arrows (dependent on year and selected country and HTML checkbox for amount of detail)
	* Function that draws and updates a bar chart (dependent on selected country)
	* Function that initialises a donut chart
	* Function that updates a donut chart (dependent on year and selected country)
* Javascript with d3.slider

*note: the function that initialises the donut, returns a SVG element which is stored as a variable and, whenever needed, is passed to the donut update function.*


There are some global variables:
* the data (stored in different ways, dependent on what is easy to use for each visualisation.)
* the year selected by slider
* the country selected on the map

The last two are global because: they are used by more than one visualisation and are used not only on change. For example, if the year is changed, the donut charts still need to know which country is selected.

Events are triggered when:
* the slider is dragged to another year or when the user clicks on the slider bar
* the user clicks on a country
* the checkbox is checked / unchecked.

### Challenges

The biggest challenge for me was learning to use D3.js again. This is because the last time I used D3.js was 1,5 years ago when I did the "Data processing" course. 

That means that it took relatively long before I managed to make a working bar chart. It began with ordering the data the correct way to append it to DOM elements. After that making the bars was not really a problem, but updating the date and deleting/appending bars was a little harder.

The next challenge was the donut chart. The first version of the donut attached data to "g"(group) elements, which on their part consisted of a "path" element (the actual donut) and a "text" element to show the name of the country. I did not succeed in updating the "path" and "text" while I attached new data to the "g" elements. I decided to search the internet to find a donut chart example that already is capable of updating text. This worked! Because this example consisted of a initialisation part and an update part I tried to make a separate "class" (I mean a class like in python) for the donut chart. I found a way to do this is javascript, the only problem was that the D3.js library didn't accept it. Finally I made the initialisation function return a svg element that is saved to a variable and used to update the donut chart.



### Important Decisions

An important decision was whether to write a function myself to draw arrows, or whether to use the datamaps "arc" function to draw arcs on the map instead of arrows. Besides the difference in appearance, there is also another difference: the "arc" function from datamaps is working out of the box, you only need to pass the country codes and it automatically will draw a line. If I would make the function myself, I would need to know the coordinates of all the countries to draw the arrows, which would take already very much time, not to mention that the arrows have to cooperate with the map when the user zooms in or drags the map to another region. So building a function to draw arrows was out of question. If I would have (much) more time, I probably would have built a function to draw arrows, just because it looks nicer and it was my original plan.

A smaller decision I made, was to remove one of the tabs with the checkbox, and place the checkbox above the tabs so it is always visible. It is a very small change of plan, but it makes the website much more easy to use since it is possible to use the checkbox while viewing graphs.



