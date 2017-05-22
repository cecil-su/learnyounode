var express = require('express')
var open = require('open')

var app = express()

app.get('', function (req, res) {
  res.send('Hello World')
}).listen(3000, function () {
  console.log('app is listening at port 3000')
  open('http://localhost:3000')
})