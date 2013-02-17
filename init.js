$(document).ready(function() {
    $('li[name="login"]').click(function(event) {
	login();
    });
    $('li[name="logout"]').click(function(event) {
	logout();
    });
    $('li[name="statuses"]').click(function(event) {
	getStatuses();
    });
});