  
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 3000

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

app.use('/user', Users)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})