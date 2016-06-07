// Patrick Schilder

"use strict";
var csvData = {};


window.onload = function() {
 	var custom_map = new Datamap({
 
        // Set the element to draw the new map in.
        element: document.getElementById("mapcontainer"),

        setProjection: function(element, options) {
		      var projection, path;
		      projection = d3.geo.mercator()                          // The d3 projection
		                     .translate([(450.0), (150.0)])      // And some options
		                     .scale(  900  / Math.PI)
		                     .center([25, 62]);
		      path = d3.geo.path()
		               .projection( projection );
		      return {path: path, projection: projection};
		    },


		done: function(datamap){
			// Panning and zooming (this 3 lines of code are from http://stackoverflow.com/questions/26811347/mouse-wheel-zoom-map-datamaps-js)
		    datamap.svg.call(d3.behavior.zoom().on("zoom", redraw));
		    function redraw() {
		        datamap.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
		    }

		    datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
	        	d3.select("#info").select("h3").text(geography.properties.name);
	        	drawGraph(geography.id);
	        });
		},
 
         
        // Customize the map.
        geographyConfig: {
 
            // Set smaller, brighter borders.
            borderColor: "blue",
            borderWidth: 0.3,
 
            // Set a less ridiculous highlight color.
            highlightFillColor: "yellow",
 
            // Let the borders be highlighted too.
            highlightBorderColor: "red",
            highlightBorderWidth: 0.3,

            // Popup tooltip settings.
	        popupOnHover: true,         // false will disable the tooltips.
	        popupTemplate: function(geo) {

	        	var tag = '<strong>' + geo.properties.name + '</strong>';

	            return '<div class="hoverinfo">' + tag + '</div>';
	        } 
	 
	        }
 
    });

    custom_map.arc([
		{
			origin: 'AFG',
			destination: 'IRQ'
		}
	], {strokeWidth: 1, arcSharpness: 1.4, strokeColor: '#DD1C77'});

    /* slider ------------------------------*/


	var drag = d3.behavior.drag()
            .origin(Object)
            .on("drag", dragMove);


	var g = d3.select('#slider').select("svg").selectAll('g')
	            .data([{x: 100, y : 20}])
	            .enter()
	                .append('g')
	                .attr('transform', 'translate(20, 10)');


    g.append('rect')
        .attr('y', 10)
        .attr("height", 5)
        .attr("width", 750)
        .attr('fill', '#C0C0C0');

	g.append("rect")
	    .attr("height", 20)
	    .attr("width", 20)
	    .attr("x", function(d) { return d.x; })
	    .attr("y", 0)
	    .attr("fill", "#2394F5")
	    .call(drag);

	function dragMove(d) {
	    d3.select(this)
	        .attr("x", d.x = Math.max(0, Math.min(750, d3.event.x)));
	}

	/* read in CSV */

	d3.csv("data/filteredUNdata.csv", function(data) {
    	var data2 = d3.nest()
			.key(function(d) { return d.countryOfAsylum})
			.entries(data);

		data2.forEach(function(d){
			csvData[d.key] = d.values;
		});
	});

}

/* draw graph with total number of refugees per year */
function drawGraph(countryCode) {
	var countryData = csvData[countryCode];
	var data = d3.nest()
		.key(function(d) { return d.year})
		.entries(countryData);

	var byYear = {};

	data.forEach(function(d) {
		byYear[d.key] = d.values;
	});

	console.log(byYear);

	//  Onderstaande werkt nog niet, hier moet een forEach loop komen die per jaar alle vluchtelingen bij elkaar optelt.

	d3.select("#historyGraph").selectAll("rect")
		.data(d3.keys(byYear))
		.enter()
		.append("rect");
};

