// Patrick Schilder

"use strict";

var csvData;
var csvByCountryOfAsylum = {};
var csvByCountryOfOrigin = {};
var csvByYear = {};


window.onload = function() {
 	var custom_map = new Datamap({
 
        // set the element to draw the new map in
        element: document.getElementById("mapcontainer"),

        setProjection: function(element, options) {
		      var projection, path;
		      projection = d3.geo.mercator()                          // the d3 projection
		                     .translate([(450.0), (150.0)])      // and some options
		                     .scale(  900  / Math.PI)
		                     .center([25, 62]);
		      path = d3.geo.path()
		               .projection( projection );
		      return {path: path, projection: projection};
		    },


		done: function(datamap){
			// panning and zooming (this 3 lines of code are from http://stackoverflow.com/questions/26811347/mouse-wheel-zoom-map-datamaps-js)
		    datamap.svg.call(d3.behavior.zoom().on("zoom", redraw));
		    function redraw() {
		        datamap.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
		    }

		    datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
	        	d3.select("#info").select("h3").text(geography.properties.name);
	        	drawGraph(geography.id, 'in');
	        	drawGraph(geography.id, 'out');
	        	drawDonut(geography.id, 'in');
	        	//drawDonut(geography.id, 'out');
	        });
		},
 
         
        // customize the map
        geographyConfig: {
 
            // set smaller, brighter borders
            borderColor: "blue",
            borderWidth: 0.3,
 
            // set a less ridiculous highlight color
            highlightFillColor: "yellow",
 
            // let the borders be highlighted too
            highlightBorderColor: "red",
            highlightBorderWidth: 0.3,

            // popup tooltip settings
	        popupOnHover: true,         // false will disable the tooltips
	        popupTemplate: function(geo) {

	        	var tag = '<strong>' + geo.properties.name + '</strong>';

	            return '<div class="hoverinfo">' + tag + '</div>';
	        } 
	 
	        }
 
    });



	/* read in CSV */

	d3.csv("data/filteredUNdata.csv", function(data) {
		csvData = data;

    	var data2 = d3.nest()
			.key(function(d) { return d.countryOfAsylum})
			.entries(data);

		data2.forEach(function(d){
			csvByCountryOfAsylum[d.key] = d.values;
		});
		// -----------------------------------------------
		var data3 = d3.nest()
			.key(function(d) { return d.year})
			.entries(data);

		data3.forEach(function(d){
			csvByYear[d.key] = d.values;
		});
		// -----------------------------------------------

		var data4 = d3.nest()
			.key(function(d) { return d.countryOfOrigin})
			.entries(data);

		data4.forEach(function(d){
			csvByCountryOfOrigin[d.key] = d.values;
		});
		// -----------------------------------------------
		drawArcs(1975);
	});

	
    /* slider ------------------------------*/

	d3.select("#slider").on("change", function() {drawArcs(this.value);});

	/* draw arcs on the map */
	function drawArcs(year) {
		//d3.selectAll(".datamaps-arc").remove();
		var plotArray = [];
		csvByYear[year].forEach(function(d){
			if (d.refugees > 1000) {
				//console.log(d.countryOfOrigin);
				if (d.countryOfOrigin == "Various" || d.countryOfOrigin == "Stateless") {
					plotArray.push({origin: {latitude: 49.553725, longitude: -31.684570}, destination: d.countryOfAsylum})
				}
				if (d.countryOfAsylum == "Various" || d.countryOfAsylum == "Stateless") {
					plotArray.push({origin: d.countryOfOrigin , destination: {latitude: 49.553725, longitude: -31.684570}})
				}
				if (d.countryOfOrigin == "Tibetans") {
					plotArray.push({origin: {latitude: 29.647535, longitude: 91.117525}, destination: d.countryOfAsylum})
				}
				else {
					plotArray.push({origin: d.countryOfOrigin, destination: d.countryOfAsylum, strokeWidth: 0.25})
				}
			};
		});


		custom_map.arc(plotArray);//, {strokeWidth: 0.1}, arcSharpness: 0.5, strokeColor: '#DD1C77'});
	};


} /* end of window.onload */






/* draw graph with total number of refugees per year */
function drawGraph(countryCode, option) {

	if (option == 'in') {
		var countryData = csvByCountryOfAsylum[countryCode];
		var id = "historyIn";
	}
	else if (option == 'out') {
		var countryData = csvByCountryOfOrigin[countryCode];
		var id = "historyOut";
	};

	if (countryData == undefined) {
		countryData = [];
	};

	var data1 = d3.nest()
		.key(function(d) { return d.year})
		.entries(countryData);

	var byYear = {};

	data1.forEach(function(d) {
		byYear[d.key] = d.values;
	});

	// count the refugees
	var graphData = [];
	
	for (var year in byYear) {
		var refugeeSum = 0;
		byYear[year].forEach( function(entry){
			refugeeSum += +entry.refugees;
		});
		
		graphData.push({"year":+year, "refugees":refugeeSum});
	};

	// -------------- //;

	var margin = {top: 10, right: 15, bottom: 35, left: 60},
    width = 400 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

	var x = d3.scale.linear()
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom")
	    .tickValues([1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2013])
	    .tickFormat(d3.format("0000"));

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var graph = d3.select("#"+id) // id depends on the kind of graph (incomming/outgoing)
		.attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    	.select("g")
	    	.attr("transform", 
	        	"translate(" + margin.left + "," + margin.top + ")");

	x.domain([1974,2014]);
	y.domain([0,d3.max(graphData, function(d) { return d.refugees; }) ]);

	// remove existing axes
	graph.selectAll("g.axis").remove()

	// add new axes
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


	// draw & update bars
	var bars = graph.selectAll("rect")
		.data(graphData);

	bars.exit()
	    .transition()
	    .duration(300)
	    .attr("y", 0)
	    .attr("height", height)
	    .style('fill-opacity', 1e-6)
	    .remove();

	bars.enter()
		.append("rect")
		    .attr("class", "bar" + " " + id)
		    .attr("y", 0)
			.attr("height", height);

	bars.transition().duration(300)
		.attr("x", function(d) { return x(d.year); })
		.attr("width", "6px")
		.attr("y", function(d) { return y(d.refugees); })
		.attr("height", function(d) { return height - y(d.refugees); });

};

// -- Donut Pie Chart ---------------------------------
// from: https://bl.ocks.org/mbostock/3887193

function drawDonut(countryCode, option) {

	var countryData = csvByCountryOfAsylum[countryCode];

	// count the refugees
	var pieData = [];
	
	countryData.forEach(function(d) {
		if (d.year == 1975) {
			pieData.push({"country": d.countryOfOrigin , "refugees": +d.refugees});
		};
	});


	var width = 400,
	    height = 200,
	    radius = Math.min(width, height) / 2;

	var color = d3.scale.ordinal()
	    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	var arc = d3.svg.arc()
	    .outerRadius(radius - 5)
	    .innerRadius(radius - 50);

	var pie = d3.layout.pie()
	    .sort(null)
	    .value(function(d) { return d.refugees; });

	var svg = d3.select("#donut")
	    .attr("width", width)
	    .attr("height", height)
		.select("g")
	    	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var g = svg.selectAll(".arc")
		.data(pie(pieData));

	g.exit()
		.transition()
		.duration(300)
		.remove();

    g.enter()
    		.append("g")
				.attr("class", "arc");

	g.append("path")
		.attr("d", arc)
		.style("fill", function(d) { return color(d.data.country); });

	g.append("text")
		.attr("class", "pieText")
		.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
		.attr("dy", ".35em")
		.text(function(d) { return d.data.country; });


};