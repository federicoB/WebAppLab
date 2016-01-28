app = {
    // Application Constructor
    initialize: function () {
        app.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', app.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        //connect to parse service
        Parse.initialize("i28LhssSuliksLKvmD30lSEjQo57IAntkornBmlc", "cEptopkDWBHbeod3eaQRcPDS0okBx8JM9Jy6AaFS");
        //get the current logged in user
        app.currentUser = Parse.User.current();
        //if the user is logged in
        if (app.currentUser) {
            // do stuff with the user
            app.showHomePage();
        } else {
            app.showLogin();
        }
    },
    showLogin: function () {
        //create a new login view and show it
        app.loginView = new Login();
        app.loginView.print();
    },
    showSignUp: function () {
        //create a new Sign up view and show it
        app.signUpView = new SignUp();
        app.signUpView.print();
    },
    showHomePage: function () {
        //create a new Home page view and show it
        app.homePageView = new HomePage();
        app.homePageView.print();
    },
    /**
     * Sign up a new user with the username,password and email given through the inputs.
     */
    makeSignUp: function () {
        var user = new Parse.User();
        user.set("username", app.signUpView.inputUserName.value);
        user.set("password", app.signUpView.inputPassword.value);
        user.set("email", app.signUpView.inputEmail.value);
        user.signUp(null, {
            success: function (user) {
                // Hooray! Let them use the app now.
                //clean the inputs forms
                app.signUpView.inputUserName.value = "";
                app.signUpView.inputPassword.value = "";
                app.signUpView.inputEmail.value = "";
                alert(user.getUsername() + " you successfully signed up", null);
                app.showHomePage();
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message, null, "Error");
            }
        });
    },
    makeLogin: function () {
        Parse.User.logIn(app.loginView.inputUserName.value, app.loginView.inputPassword.value, {
            success: function (user) {
                // Do stuff after successful login.
                alert("Welcome " + user.getUsername(), null);
                app.showHomePage();
            },
            error: function (user, error) {
                // The login failed. Check error to see why.
                alert("Error: " + error.code + " " + error.message, null, "Error");
            }
        });
    },
    makeLogOut: function () {
        if (app.currentUser) {
            Parse.User.logOut();
            app.showLogin();
        }
    }
};

window.onload = function () {
    //app.initializa is for testing on device, app.onDeviReady of testing on desktop.
    //app.initialize();
    app.onDeviceReady();
};