function getStatuses() {
    FB.api('/me/statuses', { limit: 150 }, function(response) {
	var statuses = response['data'];
	console.log(statuses);
	for (var i = 0; i < statuses.length; i++) {
	    var status = statuses[i]
	    var id = status['id'];
	    var msg = status['message'];
	    var time = status['updated_time'];
	    $('#statusTable').find('tbody')
		.append($('<tr>')
			.append($('<td>')
				.text(id))
			.append($('<td>')
				.text(time))
			.append($('<td>')
				.text(msg)));
	}
    });
}