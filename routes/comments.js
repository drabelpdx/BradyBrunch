var express = require("express");
var router  = express.Router();
var Brunch  = require("../models/brunch");
var Comment = require("../models/comment");
var middleware  = require("../middleware");


//NEW COMMENT
router.get("/brunches/:id/comments/new", middleware.isLoggedIn, function(req, res){
    Brunch.findById(req.params.id, function(err, brunch){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {brunch: brunch});
        }
    });
});

//CREATE COMMENT
router.post("/brunches/:id/comments", middleware.isLoggedIn, function(req, res){
    Brunch.findById(req.params.id, function(err, brunch){
        if(err){
            console.log(err);
            res.redirect("/brunches");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    brunch.comments.push(comment);
                    brunch.save();
                    res.redirect('/brunches/' + brunch._id);
                }
            });
        }
    });
});

//EDIT COMMENT
router.get("/brunches/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {brunch_id: req.params.id, comment: foundComment});
        }
    });
});

//UPDATE COMMENT
router.put("/brunches/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/brunches/" + req.params.id);
        }
    });
});

//DESTROY COMMENT
router.delete("/brunches/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!");
            res.redirect("/brunches/" + req.params.id);
        }
    });
});


module.exports = router;
