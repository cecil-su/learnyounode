var express = require('express')
var superagent = require('superagent')
var cheerio = require('cheerio')

var app = new express()

app.get('/', function (req, res, next) {
  // superagent.get('https://cnodejs.org/')
  superagent.get('http://www.imooc.com/course/list')
  .end(function (err, stats) {
    if (err) {
      return next(err)
    }
    var $ = cheerio.load(stats.text)
    var items = []
    // $('#topic_list .topic_title').each(function (id, ele) {
    //   var el = $(ele)
    //   items.push({
    //     title: el.attr('title'),
    //     href: el.attr('href')
    //   })
    // })
    $('.course-list .index-card-container').each(function (id, ele) {
      var el = $(ele)
      var name = el.find('.course-card-name').text()
      var link = el.find('.course-card').attr('href')
      items.push({
        title: name,
        href: link
      })
    })

    res.send(items)
  })
}).listen(3000, function () {
  console.log('server is running at port 3000.')
})