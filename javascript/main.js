// Patrick Schilder

window.onload = function() {
 	var custom_map = new Datamap({
 
        // Set the element to draw the new map in.
        element: document.getElementById("mapcontainer"),

        setProjection: function(element, options) {
		      var projection, path;
		      projection = d3.geo.mercator()                          // The d3 projection
		                     .translate([(450.0), (200.0)])      // And some options
		                     .scale( 1.6 * 900  / Math.PI)
		                     .center([25, 62]);
		      path = d3.geo.path()
		               .projection( projection );
		      return {path: path, projection: projection};
		    },

		// Panning and zooming (this functions are from http://stackoverflow.com/questions/26811347/mouse-wheel-zoom-map-datamaps-js)
		done: function(datamap){
		    datamap.svg.call(d3.behavior.zoom().on("zoom", redraw));
		    function redraw() {
		        datamap.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
		    }
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
}
