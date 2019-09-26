  
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 3000

const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
require('./config/passport')(passport);


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

   /**
    * 
    * This is new engine 
    * Templating
    * Template parsing
    * Here Using EJS types
    * 
    */
   //app.use(expressLayouts);
   app.set('view engine', 'ejs');

   /**
    *   Import all related Javascript and CSS files to inject in this App
    */
   
    app.use('/js',express.static(__dirname + '/node_modules/bootstrap/dist/js'));
    app.use('/js',express.static(__dirname + '/node_modules/tether/dist/js'));
    app.use('/js',express.static(__dirname + '/node_modules/jquery/dist'));
    app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));

var Users = require('./routes/Users')
app.use('/', require('./routes/index.js'));
app.use('/user', Users)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})