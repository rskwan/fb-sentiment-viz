function getPts(rmax) {
    return convertStatuses(master, rmax).map(function(pt) {
	return { x: pt['x'],
		 y: pt['y'],
		 color: getColor(pt['score']) };
    });
}

function getColor(score) {
    var red = d3.rgb(204, 0, 0);
    var blue = d3.rgb(0, 51, 255);
    return d3.interpolateRgb(red, blue)(score);
}

function drawPts(w, h, rmax) {
    var pts = getPts(rmax);
    console.log(pts);
    var svg = d3.select("#s12").append("svg:svg")
	.attr("width", w)
	.attr("height", h)
	.attr("display", "block")
	.attr("margin", "auto");
    console.log(svg);
    var circle = svg.selectAll("circle")
	            .data(pts);
    circle.enter().append("circle")
	.attr("cx", w / 2)
	.attr("cy", h / 2)
	.attr("r", rmax)
        .attr("fill", "white")
	.attr("stroke", "black")
	.attr("stroke-width", 4);
    var hours = hoursPosn(rmax);
    var lines = svg.selectAll("line").data(hours);
    var rules = svg.selectAll(".rule").data(hours);
    for (var i = 0; i < hours.length; i++) {
	var x = hours[i]['x'];
	var y = hours[i]['y'];
	lines.enter().append("line")
	    .attr("x1", (w / 2))
	    .attr("y1", (h / 2))
	    .attr("x2", x + (w / 2))
	    .attr("y2", y + (h / 2))
	    .style("stroke", "#ccc");
	rules.enter().append("text")
	    .attr("class", "rule")
	    .attr("x", x + (w / 2))
	    .attr("y", y + (h / 2))
	    .attr("dx", x * 0.1)
	    .attr("dy", y * 0.1)
	    .attr("text-anchor", "middle")
	    .text(i + ":00");
    }
    for (var i = 0; i < pts.length; i++) {
	var pt = pts[i];
	circle.enter().append("circle")
	    .attr("cx", pt['x'] + (w / 2))
	    .attr("cy", pt['y'] + (h / 2))
	    .attr("r", 7)
	    .attr("fill", pt['color']);
    }
}

function draw() {
    drawPts(1200, 800, 300);
}