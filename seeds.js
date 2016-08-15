var mongoose    = require("mongoose");
var Brunch  = require("./models/brunch");
var Comment     = require("./models/comment");


var data = [
    {
        name: "Tasty n Sons",
        image: "http://img2.10bestmedia.com/Images/Photos/111760/tasty-n-sons-tasty-n-sons-1_54_990x660_201405311953.jpg",
        about: "I love the bambino plate!"
    },
    {
        name: "Screen Door",
        image: "http://img2.10bestmedia.com/Images/Photos/89838/screen-door-restaurant-exterior_54_990x660_201405311814.jpg",
        about: "I love the chicken and waffles"
    }
];

function seedDB(){
    // Remove all brunches
    Brunch.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed brunches!");
        //Add a few brunches
        data.forEach(function(seed){
            Brunch.create(seed, function(err, brunch){
                if(err){
                    console.log(err);
                } else {
                    console.log("added brunch");
                }
            });
        });
    });
}

module.exports = seedDB;
