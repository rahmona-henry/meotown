var fs      = require('fs')
var path    = require('path')
var request = require('request')
require('dotenv').config();

var cats = {
  cats: [
    { id: 1, name: 'Fluffy' },
    { id: 2, name: 'Tick' }
  ]
}

// This is the filename for the cats db
var CAT_DB = path.join(__dirname, 'db/cats.json')

// ---------- RELEASE 1 ---------- //

// Complete this function so that it converts the `cats`
// object above to a JSON string and writes it to the
// `db/cats.json` file.
var saveTheCats = function (filename, cats) {
  fs.writeFileSync(filename, JSON.stringify(cats))
    console.log('For glory and honor')
}


// Complete this function so that it reads the `db/cats.json`
// file and returns its contents *as JSON*
var findTheCats = function (filename) {
  var data = fs.readFileSync(filename)
  return JSON.parse(data)
}


// ---------- RELEASE 2 ---------- //

// See https://www.flickr.com/services/api/flickr.photos.search.html
var query = [
  'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=',
  process.env.FLICKR_API_KEY,
  '&tags=cat&per_page=6&format=json&nojsoncallback=1'
].join('')

// Complete this to get the photo links from Flickr.
// Where you gonna call this from? What's the callback for?
var getCatPhotoLinks = function (callback) {
  request.get(query, function(err, response, body) {
    // Handle the error and return the body in the callback
    if (err){
      callback(err)
      return
    }
    callback(null, body)
  })
}

function extractLinks(err, data){
  if (err){
     console.log('Error alert')
    return
  }
  var photos = JSON.parse(data).photos.photo, links = []
  links = photos.map(function(photo){
  return 'https://farm' + photos.farm + '.staticflickr.com/' + photos.server + '/' + photos.id + '_' + photos.secret + '.jpg'
  })
}
getCatPhotoLinks()
exports = module.exports = {
  cats: cats,
  dbPath: CAT_DB,
  saveTheCats: saveTheCats,
  findTheCats: findTheCats,
  getCatPhotoLinks: getCatPhotoLinks,
  extractLinks: extractLinks
}

