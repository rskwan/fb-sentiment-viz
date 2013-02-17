function convertStatuses(statuses, rmax) {
    var dates = [];
    for (var i = 0; i < statuses.length; i++) {
	dates[i] = new Date(statuses[i]['time']);
    }
    console.log(dates);
    var coords = polarToRect(datesToPolar(dates), rmax);
    var pts = []
    for (i = 0; i < statuses.length; i++) {
	pts[i] = { x: coords[i]['x'],
		   y: coords[i]['y'],
		   score: statuses[i]['score'] };
    }
    return pts;
}

function datesToPolar(dates) {
    var radii = dates.map(function(date) { return date.getTime(); });
    var earliest = Math.min.apply(null, dates);
    var latest = Math.max.apply(null, dates) - earliest;
    radii = radii.map(function(date) { return date - earliest; });
    radii = radii.map(function(date) { return (date / latest); });

    var angles = dates.map(function(date) {
	var h = date.getHours();
	var m = date.getMinutes();
	return (h * (Math.PI / 12)) + (m * (Math.PI / 720));
    });

    for (var i = 0; i < dates.length; i++) {
	dates[i] = { r: radii[i], theta: angles[i] };
    }
    return dates
}

function hoursPosn(rmax) {
    var hours = [];
    for (var i = -6; i < 18; i++) {
	theta = i * (Math.PI / 12);
	hours[i + 6] = { x: rmax * Math.cos(theta),
			 y: rmax * Math.sin(theta) };
    }
    return hours;
}

function polarToRect(polars, rmax) {
    console.log("polars:", polars);
    return polars.map(function(polar) {
	var r = polar['r'] * rmax;
	var theta = polar['theta'];
	return { x: r * Math.cos(theta),
		 y: r * Math.sin(theta) };
    });
}