// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;

// load up the user model
var User       = require('../app/models/user');

// load the auth variables
var configAuth = require('./auth'); // use this one for testing

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        console.log("req.body 1");
        console.log(req.body);
        
        console.log("req.body 2");
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        console.log("local-login 1");
        // asynchronous
        process.nextTick(function() {
            console.log("local-login 2");//, 'local.role' :  req.body.role
            User.findOne({ 'local.email' :  email }, function(err, user) {
                console.log("local-login 3");
                console.log(user)
                // if there are any errors, return the error
                if (err)
                {
                    console.log("local-login 4");
                    req.flash(err);
                    console.log(err);
                    return done(err);
                }

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                // all is well, return user
                else
                {
                    console.log("local-login 5");
                    return done(null, user);
                }
            });
            console.log("local-login 6");
        });
        console.log("local-login 7");
    }));


    passport.use('local-reset', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (user)
                {

                        user.local.password = user.generateHash(password);
                        user.local.password2 = password;
                        user.save(function(err) {
                            if (err)
                                return done(err);

                            return done(null, user);
                        });
                }

                // all is well, return user
                else
                    return done(null, user);
            });
        });

    }));
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {

        console.log(email);
        console.log(password);
        console.log(req.body);
        console.log(req.user);
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            console.log("err1");
            if (!req.user || req.body.role == "CSR") {
                console.log("err12");
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    console.log(user);
                    // if there are any errors, return the error
                    if (err)
                    {
                        console.log("err2");
                        console.log(err);
                        return done(err);
                    }

                    // check to see if theres already a user with that email
                    if (user) {
                        console.log("err3");
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        console.log("err4");
                        // create the user
                        var newUser            = new User();

                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.role    = req.body.role;
                        newUser.local.password2 = password;
                        newUser.save(function(err) {
                            if (err)
                                return done(err);

                            return done(null, newUser);
                        });
                    }

                });
            // if the user is logged in but has no local account...
            } else if ( !req.user.local.email ) {
                // ...presumably they're trying to connect a local account
                console.log("err5");
                // BUT let's check if the email used to connect a local account is being used by another user
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err)
                    {
                        console.log("err6");
                        return done(err);
                    }
                    
                    if (user) {
                        console.log("err7");
                        return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
                        // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                    } else {
                        console.log("err8");
                        var user = req.user;
                        user.local.email = email;
                        user.local.password = user.generateHash(password);
                        user.save(function (err) {
                            if (err)
                                return done(err);
                            
                            return done(null,user);
                        });
                    }
                });
            } else {
                console.log("err9");
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }

        });

    }));
};
