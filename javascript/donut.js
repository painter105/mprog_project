// Patrick Schilder 10353488
"use strict";

function Donut(id) {
	
	// var width = 400,
	//     height = 200,
	// 	radius = Math.min(width, height) / 2;

	this.properties = {
		"width": 400,
		"height": 200,
		//"radius": Math.min(this.properties.width, this.properties.height) / 2
	};

	this.domId = id;
	this.svg = false;

	this.createDonut = function() {
		console.log(this.domId);
		var svg = d3.select(this.domId);

		console.log(svg);

		svg.append("g")
			.attr("class", "slices");

		svg.append("g")
			.attr("class", "labels");

		svg.append("g")
			.attr("class", "lines");

		this.svg = svg;
	}

	// this.svg = d3.select(id)
	// 	.attr("width", width)
	// 	.attr("height", height)
	// 	.select("g");

	
	// 	this.svg.append("g")
	// 		.attr("class", "slices");
	// 	this.svg.append("g")
	// 		.attr("class", "labels");
	// 	this.svg.append("g")
	// 		.attr("class", "lines");
	

	// this.pie = d3.layout.pie()
	// 	.sort(null)
	// 	.value(function(d) {
	// 		return d.value;
	// 	});

	// this.arc = d3.svg.arc()
	// 	.outerRadius(radius * 0.8)
	// 	.innerRadius(radius * 0.4);

	// this.outerArc = d3.svg.arc()
	// 	.innerRadius(radius * 0.9)
	// 	.outerRadius(radius * 0.9);

	// this.svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	// this.key = function(d){ return d.data.label; };

	// this.color = d3.scale.ordinal()
	// 	.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	// // function randomData (){
	// // 	var labels = this.color.domain();
	// // 	return labels.map(function(label){
	// // 		return { label: label, value: Math.random() }
	// // 	});
	// // };


	// this.change = function(data) {
		
	// 	/* ------- PIE SLICES -------*/
	// 	var slice = this.svg.select(".slices").selectAll("path.slice")
	// 		.data(this.pie(data), this.key);

	// 	slice.enter()
	// 		.insert("path")
	// 		.style("fill", function(d) { return this.color(d.data.label); })
	// 		.attr("class", "slice");

	// 	slice		
	// 		.transition().duration(1000)
	// 		.attrTween("d", function(d) {
	// 			this._current = this._current || d;
	// 			var interpolate = d3.interpolate(this._current, d);
	// 			this._current = interpolate(0);
	// 			return function(t) {
	// 				return this.arc(interpolate(t));
	// 			};
	// 		})

	// 	slice.exit()
	// 		.remove();

	// 	/* ------- TEXT LABELS -------*/

	// 	var text = this.svg.select(".labels").selectAll("text")
	// 		.data(this.pie(data), this.key);

	// 	text.enter()
	// 		.append("text")
	// 		.attr("dy", ".35em")
	// 		.text(function(d) {
	// 			return d.data.label;
	// 		});
		
	// 	function midAngle(d){
	// 		return d.startAngle + (d.endAngle - d.startAngle)/2;
	// 	}

	// 	text.transition().duration(1000)
	// 		.attrTween("transform", function(d) {
	// 			this._current = this._current || d;
	// 			var interpolate = d3.interpolate(this._current, d);
	// 			this._current = interpolate(0);
	// 			return function(t) {
	// 				var d2 = interpolate(t);
	// 				var pos = this.outerArc.centroid(d2);
	// 				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
	// 				return "translate("+ pos +")";
	// 			};
	// 		})
	// 		.styleTween("text-anchor", function(d){
	// 			this._current = this._current || d;
	// 			var interpolate = d3.interpolate(this._current, d);
	// 			this._current = interpolate(0);
	// 			return function(t) {
	// 				var d2 = interpolate(t);
	// 				return midAngle(d2) < Math.PI ? "start":"end";
	// 			};
	// 		});

	// 	text.exit()
	// 		.remove();

	// 	/* ------- SLICE TO TEXT POLYLINES -------*/

	// 	var polyline = this.svg.select(".lines").selectAll("polyline")
	// 		.data(this.pie(data), this.key);
		
	// 	polyline.enter()
	// 		.append("polyline");

	// 	polyline.transition().duration(1000)
	// 		.attrTween("points", function(d){
	// 			this._current = this._current || d;
	// 			var interpolate = d3.interpolate(this._current, d);
	// 			this._current = interpolate(0);
	// 			return function(t) {
	// 				var d2 = interpolate(t);
	// 				var pos = this.outerArc.centroid(d2);
	// 				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
	// 				return [this.arc.centroid(d2), outerArc.centroid(d2), pos];
	// 			};			
	// 		});
		
	// 	polyline.exit()
	// 		.remove();
	// }; 
}