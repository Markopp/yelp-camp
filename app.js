var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	flash	   = require("connect-flash"),
	Comment    = require("./models/comment"),
	Campground = require("./models/campground"),
	seedDB     = require("./seeds"),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer"),
	passport = require("passport"),
	User = require("./models/user"),
	LocalStrategy = require ("passport-local");
	
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");
	

mongoose.connect("process.env.DATABASEURL");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", ".ejs");
//seedDB();
app.use(methodOverride("_method"));
app.use(flash());

/*

Campground.create({
		name: "Granite Hill", 
		image:"https://images.unsplash.com/photo-1464054313797-e27fb58e90a9?format=auto&auto=compress&dpr=1&crop=entropy&fit=crop&w=824&h=547&q=80",
		description: "This is an amazing granite hill. Beautiful view. No Water"
	
}, function(err, campground){
		if(err){
			console.log("err");
		} else {
			console.log("New1ly created campground: ");
			console.log(campground);
		}
	});

*/

app.use(require("express-session")({
	secret: "Uber secret stuff",
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
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Yelp Camp Server has started!");	
});