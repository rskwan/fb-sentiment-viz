$(document).ready(function() {
    $('#login').click(function(event) {
	login();
    });
    $('#logout').click(function(event) {
	logout();
    });
    $('#statbtn').click(function(event) {
	checkLogin();
	initStatuses(20);
    });
    $('#drawbtn').click(function(event) {
	draw();
    });
});