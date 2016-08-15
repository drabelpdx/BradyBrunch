var express = require("express");
var router  = express.Router();
var passport= require("passport");
var User    = require("../models/user");
var middleware  = require("../middleware");


//LANDING
router.get("/", function(req, res){
    res.render("landing");
});

//AUTH ROUTES

//Show Register form
router.get("/register", function(req, res){
  res.render("register");
});

//Handle Sign Up
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      req.flash("error", err.message);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to Brady Brunch " + req.body.username);
      res.redirect("/brunches");
    });
  });
});

//Show login form
router.get("/login", function(req, res){
  res.render("login");
});

//Handles login logic
router.post("/login", passport.authenticate("local",
    {
      successRedirect: "/brunches",
      failureRedirect: "/login"
    }), function(req, res){
});

//Logic route
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/brunches");
});


module.exports = router;
