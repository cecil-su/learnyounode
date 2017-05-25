var express = require('express')
var superagent = require('superagent')
var cheerio = require('cheerio')
var eventproxy = require('eventproxy')

var url = require('url')
var imooc = 'http://www.imooc.com/course/list'

superagent.get(imooc)
.end(function (err, res) {
  if (err) {
    console.error(err)
  }

  var items = []
  var $ = cheerio.load(res.text)
  $('.course-list .index-card-container').each(function (id, ele) {
    var el = $(ele)
    var href = url.resolve(imooc, el.find('.course-card').attr('href'))
    items.push(href)
  })

  var ep = new eventproxy()
  ep.after('imooc_html', items.length, function (lessons) {
    lessons = lessons.map(function (lessonPair) {
      // console.log(lessonPair)
      var url = lessonPair[0]
      var html = lessonPair[1]
      var $ = cheerio.load(html)
      return ({
        title: $('.course-infos h2.l').text().trim(),
        href: url
      })
    })
    console.log(lessons)
  })

  items.forEach(function (lesson) {
    superagent.get(lesson)
    .end(function (err, res) {
      ep.emit('imooc_html', [lesson, res.text])
    })
  })
})
