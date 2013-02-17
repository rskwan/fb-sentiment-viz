var master;

function getStatuses() {
    master = [];
    FB.api('/me/statuses', { limit: 2 }, function(response) {
	var statuses = response['data'];
	var cleaned = {};
	for (var i = 0; i < statuses.length; i++) {
	    var status = statuses[i]
	    var clean = { time: status['updated_time'],
			  msg: status['message'] }
	    setSentiment(clean);
	}
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
	    status['score'] = score;
	    writeToTable(status);
	    master.push(status)
	});
    });
}

function writeToTable(status) {
    $('#statusTable').find('tbody')
	.append($('<tr>')
		.append($('<td>')
			.text(status['time']))
		.append($('<td>')
			.text(status['msg']))
		.append($('<td>')
			.text(status['score'])));
}
