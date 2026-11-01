var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Get User Model
var User = require('../models/user');



// configure passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/*
* POST register
*/
/*router.post('/register', function (req, res) {

    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ username: username }, function (err, user) {
        if (err) console.log(err);

        if (user) {
            res.json("userExists");
        } else {
            var user = new User({
                username: username,
                password: password
            });

            user.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json("userRegistered");
                }
            });
        }
    });
});

/*
* POST login
*/
/*router.post('/login', function (req, res) {

    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ username: username, password: password }, function (err, user) {
        if (err) console.log(err);

        if (user) {
            res.json(username);
        } else {
            res.json("invalidLogin");
        }
    });
});*/

    // Define a middleware function to be used for every secured routes
    var auth = function(req, res, next){
      if (!req.isAuthenticated()) 
        res.send(401);
      else
        next();
    };


 // route to test if the user is logged in or not
    router.get('/loggedin', function(req, res) {
       
        console.log("isAuthenticated():" + req.isAuthenticated());
      res.send(req.isAuthenticated() ? req.user : '0');
    });

    router.post('/register', auth, function(req, res) {
      User.register(new User({ username: req.body.username }),
        req.body.password, function(err, account) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        }
        passport.authenticate('local')(req, res, function () {
          return res.status(200).json({
            status: 'Registration successful!'
          });
        });
      });
    });

    // route to log in
    router.post('/login', passport.authenticate('local'), function(req, res) {
        console.log("user:" + req.user);
        res.send(req.user);
    });

    // route to log out
    router.post('/logout', function(req, res){
      req.logOut();
      res.sendStatus(200);
    });

// Exports
module.exports = router;