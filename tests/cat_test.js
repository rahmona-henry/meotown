'use strict'

var test    = require('tape')
var request = require('supertest')
var fs      = require('fs')
var path    = require('path')
var request = require('supertest')

var app  = require('../index')
var cats = require('../cats')

var CAT_TEST_DB = path.join(__dirname, '../db/test_cats.json')

var TEST_CATS = {
  cats: [
    { id: 1, name: "Fluffy" },
    { id: 2, name: "Muffy" },
    { id: 3, name: "Morris"}
  ]
}

var BLANK_DB = { cats: [] }

test('saveTheCats', function (t) {
  fs.writeFileSync(CAT_TEST_DB, JSON.stringify(BLANK_DB))
  cats.saveTheCats(CAT_TEST_DB, TEST_CATS)

  var results = fs.readFileSync(CAT_TEST_DB, 'utf-8')

  t.equal(results, JSON.stringify(TEST_CATS), 'All cats saved!')
  t.end()
})

test('findTheCats', function (t) {
  fs.writeFileSync(CAT_TEST_DB, JSON.stringify(TEST_CATS))
  var results = cats.findTheCats(CAT_TEST_DB)

  t.equal(results.cats && results.cats.length, 3, 'All cats found!')
  t.end()
})

test('GET /cats/new', function (t) {
  request(app)
    .get('/cats/new')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .end(function (err, res) {
      // res.text should be the output of your template
      // write a test here to ensure that there are six images representing
      // the six cats in your output. You'll probably want a Regex.
      t.equal(res.text.toString().match(/<img/g).length,6,'there are six images representing');

      t.end()
    })
})
