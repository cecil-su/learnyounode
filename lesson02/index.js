var express = require('express')
var utility = require('utility')
var open = require('open')

var app = new express()

app.get('/', function (req, res) {
  var q = req.query.q
  var md5 = utility.md5(q)
  res.send(md5)
})

app.listen(3000, function (err, stats) {
  console.log(err, stats)
  console.log('app is running at port 3000')
  open('http://localhost:3000?q=cecil')
})