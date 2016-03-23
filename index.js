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
  res.render('cats/index', cats)
})

// Display the new cat form
app.get('/cats/new', function (req, res) {
  // RELEASE 2
  // Use `cats.getCatPhotoLinks` to get six cat image links
  // then pass them to the `cats/new` template and render it
  cats.getCatPhotoLinks(cats.extractLinks)
  res.render('cats/new')
})

// Show detail for cat with id === :id
// Try going to /cats/1
app.get('/cats/:id', function (req, res) {
  res.end(JSON.stringify(req.params))
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
  res.end('You found the patch!')
})

// Delete the cat with id === :id
// You can reach this with a DELETE or with a POST passing
// a key-value pair: _method=DELETE
// See the home page for an example
app.delete('/cats/:id', function (req, res) {
  res.end('You found the delete!')
})

// Handle the posted form data
app.post('/cats', function (req, res) {
  res.end(JSON.stringify(req.body))
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
