'use strict'

require('dotenv').config()

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var express        = require('express') // import express.js
var hbs            = require('express-hbs') // handlebars
var bodyParser     = require('body-parser') // parse request bodies
var path           = require('path') // work with file paths
var methodOverride = require('method-override') // allow put, delete through post

var app = express() // create the express application
var server = require('http').createServer(app) // create the server

var cats = require('./cats') // import the cat functions

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
  defaultLayout: __dirname + '/views/layout'
}))

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))

app.get('/', function (req, res) {
  res.redirect('/cats')
})

// List all cats
app.get('/cats', function (req, res) {
  var catsArr=cats.findTheCats('./db/cats.json');
  res.header( 'Access-Control-Allow-Origin','*' );
  //res.render('cats/index', catsArr)
  res.json(catsArr);
})

// Display the new cat form
app.get('/cats/new', function (req, res) {
  // RELEASE 2
  // Use `cats.getCatPhotoLinks` to get six cat image links
  // then pass them to the `cats/new` template and render it
  cats.getCatPhotoLinks(function(err,data){
    res.render('cats/new',{images: data})
  })
})

// Show detail for cat with id === :id
// Try going to /cats/1
app.get('/cats/:id', function (req, res) {
  var catsArr=cats.findTheCats('./db/cats.json');
  var _cat=catsArr.cats.filter(function(cat){
    return cat.id==req.params.id;
  })
  res.header( 'Access-Control-Allow-Origin','*' );
/*  if(!_cat[0].visited){
    _cat[0].visited=0;
  }*/
/*  _cat[0].visited++;*/
/*  cats.saveTheCats('./db/cats.json',catsArr);*/
 //res.render('cats/show',{cats:_cat});
  res.json({cats:_cat});
})

// Display the edit form for cat with id === :id
// Try going to /cats/1/edit
app.get('/cats/:id/edit', function (req, res) {
  res.end(JSON.stringify(req.params))
})

// Update the cat with id === :id
// You can reach this with a PATCH or with a POST passing
// a key-value pair: _method=PATCH
// See the home page for an example
app.patch('/cats/:id', function (req, res) {
  var catsArr=cats.findTheCats('./db/cats.json');
  catsArr.cats=catsArr.cats.filter(function(cat){
    return cat.id==req.params.id;
  })
 res.render('cats/edit',catsArr);
})

app.post('/cats/:id', function (req, res) {
  var catsArr=cats.findTheCats('./db/cats.json');
  var theOnewewant=catsArr.cats.filter(function(cat){
    return cat.id == req.params.id;
  })
  theOnewewant[0].name=req.body.name;
  theOnewewant[0].life_story=req.body.life_story
  cats.saveTheCats('./db/cats.json',catsArr);
 res.redirect('/cats')
 //res.json({cats:catsArr});
})

// Delete the cat with id === :id
// You can reach this with a DELETE or with a POST passing
// a key-value pair: _method=DELETE
// See the home page for an example
app.delete('/cats/:id', function (req, res) {
  var catsArr=cats.findTheCats('./db/cats.json');
  catsArr.cats=catsArr.cats.filter(function(cat){
    return cat.id!=req.params.id;
  })
  cats.saveTheCats('./db/cats.json',catsArr);
  res.header( 'Access-Control-Allow-Origin','*' );
  //res.redirect('/cats')
  res.json({cats:catsArr});
})

// Handle the posted form data


app.post('/cats', function (req, res) {
  var catsArr=cats.findTheCats('./db/cats.json');
  var newCat=req.body;
  newCat.id= Date.now();
  catsArr.cats.push(newCat)
  cats.saveTheCats('./db/cats.json',catsArr);
  //res.end(JSON.stringify(req.body))
  //res.render('cats/index',catsArr);
  res.header( 'Access-Control-Allow-Origin','*' );
  res.json({cats:[newCat]});
})

// Start the app only when run with npm start
// Don't run it when imported into the tests
if (require.main === module) {
  server.listen(3000, function () {
    console.log('Meowtown now purring at port 3000!')
  })
}

// For testing purposes
exports = module.exports = app
