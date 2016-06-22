// Patrick Schilder

//"use strict";

var csvByCountryOfAsylum = {};
var csvByCountryOfOrigin = {};
var csvByYear = {};
var countryCodes = {};

var sliderYear = 2013;
var clickedCountry = "Various";


// calculate the colors to fill the map
function colorMap(data) {
	// Datamaps expect data in format:
    // { "USA": { "fillColor": "#42a844", numberOfWhatever: 75},
    //   "FRA": { "fillColor": "#8dc386", numberOfWhatever: 43 } }

    // We need to colorize every country based on "numberOfWhatever"
    // colors should be uniq for every value.
    // For this purpose we create palette(using min/max series-value)
    
    var minValue = 0,
        maxValue = 1000000000000;
    // create color palette function
    // color can be whatever you wish
    var paletteScale = d3.scale.linear()
            .domain([minValue,maxValue])
            .range(["#EFEFFF","#02386F"]); // blue color
    // fill dataset in appropriate format
    series.forEach(function(item){ //
        // item example value ["USA", 70]
        var iso = item[0],
                value = item[1];
        dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
    });
};


window.onload = function() {
 	var custom_map = new Datamap({
 
        // set the element to draw the new map in
        element: document.getElementById("mapcontainer"),

        setProjection: function(element, options) {
		      var projection, path;
		      projection = d3.geo.mercator()                          // the d3 projection
		                     // .translate([(450.0), (150.0)])      // and some options
		                     // .scale(  900  / Math.PI)
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
	        	clickedCountry = geography.id;

	        	drawGraph(clickedCountry, 'in');
	        	drawGraph(clickedCountry, 'out');
	        	drawDonut(sliderYear, clickedCountry);
	        	drawArcs(sliderYear, clickedCountry);

	        	// // color the arcs that go to the country you clicked on
	        	// d3.selectAll(".datamaps-arc").each(function(d) {
	        	// 	if (JSON.parse(d3.select(this).attr("data-info")).destination == clickedCountry) {
	        	// 		this.style.stroke = "red";
	        	// 	}
	        	// 	else if (JSON.parse(d3.select(this).attr("data-info")).origin == clickedCountry) {
	        	// 		this.style.stroke = "green";
	        	// 	}
	        	// 	else {
	        	// 		this.style.stroke = "black";
	        	// 	}
	        	// }) ;
	        	
	        });
		},
 
        fills: { defaultFill: '#F5F5F5' },

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

    var bombs = [{
	    name: 'Various countries',
	    radius: 5,
	    latitude: 49.553725,
	    longitude: -31.684570,
	   }];
	//draw bubbles for bombs
	custom_map.bubbles(bombs, {
	    popupTemplate: function (geo, data) {
	            return ['<div class="hoverinfo">',
	            'Various countries',
	            '</div>'].join('');
	    }
	});



	/* read in CSV */

	d3.csv("data/filteredUNdata.csv", function(data) {

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
		drawArcs(sliderYear);
	});

	d3.csv("data/countrycodes.csv", function(data) {
		data.forEach(function(d){
			countryCodes[d.code] = d.name;
		})
    	
	});

	
    /* slider ------------------------------*/
    d3.select("#slider").call(d3.slider()
    	.axis(true)
    	.min(1975)
    	.max(2013)
    	.value(2013)
    	.step(1)
    	.on("slide", function(evt, value) {
    		sliderYear = value;
    		drawArcs(sliderYear, clickedCountry);
    		drawDonut(sliderYear, clickedCountry);
    	}));

    // checkbox verandering
    d3.select("#drawAll").on("click", function(evt) {
    		drawArcs(sliderYear, clickedCountry);
    	});



	/* draw arcs on the map */
	function drawArcs(year, country) {
		var country = typeof country !== 'undefined' ?  country : 0;
		var focus = document.getElementById("drawAll").checked;

		var border = focus ? 1000 : 20000;

		function thickness(amount) {
			// the thickness is based on the following formula (except for amount < 10000)
			// return (amount/3000000) * 5 +0.4
			if (amount>1000000) {return 2;}
			else if (amount>500000) {return 1.00;}
			else if (amount>100000) {return 0.55;}
			else if (amount>50000) {return 0.48;}
			else if (amount>10000) {return 0.42;}
			else if (amount>5000) {return 0.30;}
			else {return 0.20;};
		}

		var plotArray = [];
		csvByYear[year].forEach(function(d){
			if (d.refugees > border) {

				if (d.countryOfOrigin == "Various" || d.countryOfOrigin == "Stateless" ) {var from = {latitude: 49.553725, longitude: -31.684570};}
				else if (d.countryOfOrigin == "Tibet") {var from = {latitude: 29.647535, longitude: 91.117525}}
				else {var from = d.countryOfOrigin;};
				
				if (d.countryOfAsylum == "Various" || d.countryOfAsylum == "Stateless" ) {var to = {latitude: 49.553725, longitude: -31.684570};}
				else {var to = d.countryOfAsylum;};
				

				if (from == country) {
					plotArray.push({origin: from, destination: to, strokeWidth: thickness(d.refugees), strokeColor: 'red'});
				}
				else if (to == country) {
					plotArray.push({origin: from, destination: to, strokeWidth: thickness(d.refugees), strokeColor: '#52D017'});
				}
				else if (!(focus)) {
					plotArray.push({origin: from, destination: to, strokeWidth: thickness(d.refugees), strokeColor: 'black'});
				};
			};
		});

		custom_map.arc(plotArray, {arcSharpness: 0.2});//, {strokeWidth: 0.1}, arcSharpness: 0.5, strokeColor: '#DD1C77'});
		
	};



	// -- Donut Pie Chart ---------------------------------
	// from: http://bl.ocks.org/dbuezas/9306799

	var donut1 = makeDonut("#donut1");
	var donut2 = makeDonut("#donut2");

	function drawDonut(year, countryCode) {

		var countryData1 = csvByCountryOfAsylum[countryCode];

		// count the refugees
		var pieData1 = [];
		var total1 = 0;
		var various1 = 0;

		if (typeof countryData1 !== "undefined") {	
			countryData1.forEach(function(d) {
				if (d.year == year) {
					total1 += +d.refugees;
				};
				
			});
		};


		if (typeof countryData1 !== "undefined") {	
			countryData1.forEach(function(d) {
				if (d.year == year) {
					if (+d.refugees/total1 < 0.05 || d.countryOfOrigin == "Various") {
						various1 += +d.refugees;
					}
					else {
						pieData1.push({label: d.countryOfOrigin , value: +d.refugees});
					};
				};
			});
		};

		if (various1 > 0) {
			pieData1.push({label: "Various" , value: various1});
		};

		if (pieData1.length == 0) {
			pieData1.push({label: "NO DATA" , value: 0});
		};

		change(donut1,pieData1);

		//-------------------------------------------------------------

		var countryData2 = csvByCountryOfOrigin[countryCode];

		// count the refugees
		var pieData2 = [];
		var total2 = 0;
		var various2 = 0;

		if (typeof countryData2 !== "undefined") {	
			countryData2.forEach(function(d) {
				if (d.year == year) {
					total2 += +d.refugees;
				};
				
			});
		};
		
		if (typeof countryData2 !== "undefined") {
			countryData2.forEach(function(d) {
				if (d.year == year) {
					if (+d.refugees/total2 < 0.05 || d.countryOfAsylum == "Various") {
						various2 += +d.refugees;
					}
					else {
					pieData2.push({label: d.countryOfAsylum , value: +d.refugees});
					};
				};
			});
		};

		if (various2 > 0) {
			pieData2.push({label: "Various" , value: various2});
		};

		if (pieData2.length == 0) {
			pieData2.push({label: "NO DATA" , value: 0});
		}

		change(donut2,pieData2);


	}; /* end of drawDonut */



}; /* end of window.onload */

// ############################################################################

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



// donut init

function makeDonut(id) {
	var width = 429,
	    height = 190,
		radius = Math.min(width, height) / 2;

	var svg = d3.select(id)
		.attr("width", width)
		.attr("height", height)
		.select("g");

	svg.append("g")
		.attr("class", "slices");
	svg.append("g")
		.attr("class", "labels");
	svg.append("g")
		.attr("class", "lines");

	svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	return svg;

};


// update donut

function change(svg, data) {

	var width = 400,
	    height = 180,
		radius = Math.min(width, height) / 2;

	var pie = d3.layout.pie()
		.value(function(d) {
			return d.value;
		})
		.startAngle(90 * (Math.PI/180))
		.endAngle(450 * (Math.PI/180));

	var arc = d3.svg.arc()
		.outerRadius(radius * 0.8)
		.innerRadius(radius * 0.4);

	var outerArc = d3.svg.arc()
		.innerRadius(radius * 0.9)
		.outerRadius(radius * 0.9);

	var key = function(d){ return d.data.label; };

	var color = d3.scale.category20();

	/* ------- PIE SLICES -------*/
	var slice = svg.select(".slices").selectAll("path.slice")
		.data(pie(data), key);

	var div = d3.select("body")
        .append("div") 
        .attr("class", "donutTooltip");

	slice.enter()
		.insert("path")
		.style("fill", function(d) { return color(d.data.label); })
		.attr("class", "slice")
		// tooltip
		.on("mousemove",function(d){
	        var mouseVal = d3.mouse(this);
	        div
	        .html(d.data.value)
	        .style("left", (d3.event.pageX+12) + "px")
	        .style("top", (d3.event.pageY-10) + "px")
	        .style("opacity", 1)
	        .style("display","block");
		})

    	.on("mouseout",function(){div.html(" ").style("display","none");})


	slice		
		.transition().duration(1000)
		.attrTween("d", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				return arc(interpolate(t));
			};
		})

	slice.exit()
		.remove();

	/* ------- TEXT LABELS -------*/

	var text = svg.select(".labels").selectAll("text")
		.data(pie(data), key);

	text.enter()
		.append("text")
		.attr("dy", ".35em")
		.text(function(d) {
			if (d.data.label.length == 3) {
				return countryCodes[d.data.label];
			}
			else {
				return d.data.label;
			};
		});
	
	function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}

	text.transition().duration(1000)
		.attrTween("transform", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * ((midAngle(d2) > 2*Math.PI || midAngle(d2) < Math.PI) ? 1 : -1);
				return "translate("+ pos +")";
			};
		})
		.styleTween("text-anchor", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				return (midAngle(d2) > 2*Math.PI || midAngle(d2) < Math.PI) ? "start":"end";
			};
		});

	text.exit()
		.remove();

	/* ------- SLICE TO TEXT POLYLINES -------*/

	var polyline = svg.select(".lines").selectAll("polyline")
		.data(pie(data), key);
	
	polyline.enter()
		.append("polyline");

	polyline.transition().duration(1000)
		.attrTween("points", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * 0.95 * ((midAngle(d2) > 2*Math.PI || midAngle(d2) < Math.PI) ? 1 : -1);
				return [arc.centroid(d2), outerArc.centroid(d2), pos];
			};			
		});
	
	polyline.exit()
		.remove();
}; 