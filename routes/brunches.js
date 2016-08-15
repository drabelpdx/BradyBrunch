var express = require("express");
var router  = express.Router();
var Brunch  = require("../models/brunch");
var Comment = require("../models/comment");
var middleware  = require("../middleware");


//INDEX
router.get("/brunches", function(req, res){
    Brunch.find({}, function(err, allBrunches){
       if(err){
            console.log(err);
        } else {
            res.render("brunches/index", {brunches: allBrunches});
        }
    });
});

//NEW
router.get("/brunches/new", middleware.isLoggedIn, function(req, res){
    res.render("brunches/new");
});

//CREATE
router.post("/brunches", middleware.isLoggedIn, function(req, res){
   var name = req.body.name;
   var url = req.body.url;
   var image = req.body.image;
   var about = req.body.about;
   var author = {
     id: req.user._id,
     username: req.user.username
   };
   var newBrunch = {name: name, url: url, image: image, about: about, author: author};
   Brunch.create(newBrunch, function(err, newBrunch){
       if(err){
           res.render("new");
       } else {
           res.redirect("/brunches");
       }
   });
});

//SHOW
router.get("/brunches/:id", function(req, res){
    Brunch.findById(req.params.id).populate("comments").exec(function(err, foundBrunch){
        if(err){
            res.redirect("/brunches");
        } else {
            res.render("brunches/show", {brunch: foundBrunch});
        }
    });
});

//EDIT
router.get("/brunches/:id/edit", middleware.checkEntryOwnership, function(req, res){
    Brunch.findById(req.params.id, function(err, foundBrunch){
        if(err){
            res.redirect("/brunches");
        } else {
            res.render("brunches/edit", {brunch: foundBrunch});
        }
    });
});

//UPDATE
router.put("/brunches/:id", middleware.checkEntryOwnership, function(req, res){
    Brunch.findByIdAndUpdate(req.params.id, req.body.brunch, function(err, updatedBrunch){
        if(err){
            res.redirect("/brunches");
        } else {
            res.redirect("/brunches/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/brunches/:id", middleware.checkEntryOwnership, function(req, res){
    Brunch.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/brunches");
        } else {
            req.flash("success", "Brunch deleted!");
            res.redirect("/brunches");
        }
    });
});


module.exports = router;
