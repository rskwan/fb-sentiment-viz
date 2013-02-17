function getStatuses() {
    FB.api('/me/statuses', { limit: 1 }, function(response) {
	var statuses = response['data'];
	for (var i = 0; i < statuses.length; i++) {
	    var status = statuses[i]
	    var id = status['id'];
	    var time = status['updated_time'];
	    var msg = status['message'];
	    var sentiment = getSentiment(msg);
	    $('#statusTable').find('tbody')
		.append($('<tr>')
			.append($('<td>')
				.text(time))
			.append($('<td>')
				.text(msg))
			.append($('<td>')
				.text(sentiment)));
	}
    });
}

function getSentiment(msg) {
    var key = "";
    $.get('key.txt', function(data) {
	key = data.replace(/\s/gm, '');
	console.log(key);
	var lymbix = $.lymbix(key);
	lymbix.tonalize(msg, function(data) {
	    return data['article_sentiment']['score'];
	});
    });
}