var master;
var total;

function initStatuses(maxstats) {
    $("#pitch").replaceWith(
	'<div class="progress progress-striped active"><div id="progbar" class="bar" style="width: 0%;"></div></div>');
    $("#statbtn").addClass("disabled");
    $("#drawbtn").removeClass("disabled");
    master = [];
    FB.api('/me/statuses', { limit: maxstats }, function(response) {
	var statuses = response['data'];
	total = statuses.length;
	$("#intro").replaceWith('<h1 id="stath">Status updates processed: 0/' + total + '</h1>');
	var cleaned = {};
	statuses.forEach(function(status) {
	    var clean = { time: status['updated_time'],
			  msg: status['message'] };
	    setSentiment(clean);
	});
    });
}

function setSentiment(status) {
    var key = "";
    $.get('key.txt', function(data) {
	key = data.replace(/\s/gm, '');
	var lymbix = $.lymbix(key);
	var msg = status['msg'];
	lymbix.tonalize(msg, function(data) {
	    var score = data['article_sentiment']['score'];
	    if (score > 5) {
		score = 5;
	    } else if (score < -5) {
		score = -5;
	    }
	    status['score'] = (score + 5) / 10;
	    master.push(status)
	    var len = master.length;
	    var percent = 100 * (len / total);
	    $("#stath").replaceWith('<h1 id="stath">Status updates processed: ' + len + '/' + total + '</h1>');
	    $("#progbar").css("width", percent + "%");
	});
    });
}