// Patrick Schilder

"use strict";
var csvData;
var csvByCountryOfAsylum = {};


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

 //    custom_map.arc([
	// 	{
	// 		origin: 'AFG',
	// 		destination: 'IRQ'
	// 	}
	// ], {strokeWidth: 1, arcSharpness: 1.4, strokeColor: '#DD1C77'});


	/* read in CSV */

	d3.csv("data/filteredUNdata.csv", function(data) {
		csvData = data;

    	var data2 = d3.nest()
			.key(function(d) { return d.countryOfAsylum})
			.entries(data);

		data2.forEach(function(d){
			csvByCountryOfAsylum[d.key] = d.values;
		});
		drawArcs();
	});

	function drawArcs() {
		var plotArray = [];
		csvData.forEach(function(d){
			plotArray.push({origin: d.countryOfOrigin, destination: d.countryOfAsylum})
		});
		custom_map.arc(plotArray);
	};
		


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


}

/* draw graph with total number of refugees per year */
function drawGraph(countryCode) {

	var countryData = csvByCountryOfAsylum[countryCode];
	if (countryData == undefined) {
		countryData = [];
	};

	var data = d3.nest()
		.key(function(d) { return d.year})
		.entries(countryData);

	var byYear = {};

	data.forEach(function(d) {
		byYear[d.key] = d.values;
	});

	//console.log(byYear);

	var graphData = [];
	
	for (var year in byYear) {
		var refugeeSum = 0;
		byYear[year].forEach( function(entry){
			refugeeSum += +entry.refugees;
		});
		
		graphData.push({"year":+year, "refugees":refugeeSum});
	};

	//console.log(graphData);
	// -------------- //;

	var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 400 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

	var x = d3.scale.linear()
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom")
	    .tickValues([1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010]);

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var graph = d3.select("#historyGraph")
		.attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    	.select("g")
	    	.attr("transform", 
	        	"translate(" + margin.left + "," + margin.top + ")");

	x.domain(d3.extent(graphData,function(d) { return d.year; }));
	y.domain(d3.extent(graphData, function(d) { return d.refugees; }));

	// Remove existing axes (the bars are not stored in g elements, but axes are)
	graph.selectAll("g.axis").remove()

	graph.append("g")
	  .attr("class", "x axis")
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis)
	.selectAll("text")
	  .style("text-anchor", "end")
	  .attr("dx", "-.8em")
	  .attr("dy", "-.55em")
	  .attr("transform", "rotate(-90)" );

	graph.append("g")
	  .attr("class", "y axis")
	  .call(yAxis)
	.append("text")
	  .attr("transform", "rotate(-90)")
	  .attr("y", 6)
	  .attr("dy", ".71em")
	  .style("text-anchor", "end")
	  .text("# refugees");


	var bars = graph.selectAll("rect")
		.data(graphData);

	bars.exit()
	    .transition()
	      .duration(300)
	    .attr("y", y(0))
	    .attr("height", height - y(0))
	    .style('fill-opacity', 1e-6)
	    .remove();

	bars.enter()
		.append("rect")
	    .attr("class", "bar")
	    .attr("y", 0)
		.attr("height", height);

	bars.transition().duration(300)
		.attr("x", function(d) { return x(d.year); })
		.attr("width", "8px")
		.attr("y", function(d) { return y(d.refugees); })
		.attr("height", function(d) { return height - y(d.refugees); });

};

