window.fbAsyncInit = function() {
    FB.init({
        appId      : 422807544450858,
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
    });
    FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
            replaceLoginElem();
        }
    });
};

// Load the SDK Asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

function login() {
    FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
            alert("You're already logged in!");
        } else {
            FB.login(function(response) {
                if (response.authResponse) {
                    // connected
                } else {
                    // cancelled
                }
            }, { scope: 'user_status' });
            replaceLoginElem();
        }
    });
}

function logout() {
    FB.logout(function(response) {
        // logged out
    })
}

function replaceLoginElem() {
    $('li[name="login"]')
        .replaceWith('<li name="logout"><a href="#">Log Out</a></li>');
}