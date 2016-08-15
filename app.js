var express     = require("express"),
    app         = express(),
    bodyPaser   = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    flash       = require("connect-flash"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Brunch      = require("./models/brunch"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

var commentRoutes = require("./routes/comments"),
    brunchRoutes  = require("./routes/brunches"),
    indexRoutes   = require("./routes/index");


// APP CONFIG
mongoose.connect("mongodb://localhost/brunch");
app.use(bodyPaser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB(); //seed the database

//AIzaSyBt0iZxncA-p8C83lwJYMNef-wlqHYvAN8 //GOOGLEAPI


// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "My Express App Secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error       = req.flash("error");
   res.locals.success     = req.flash("success");
   next();
});

app.use(indexRoutes);
app.use(brunchRoutes);
app.use(commentRoutes);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});