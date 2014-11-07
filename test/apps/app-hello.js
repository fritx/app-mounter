var express = require('express')
var app = express()
var Mounter = require('../../')

Mounter.proxy(app)

app.get('/', function(req, res){
  res.send('hello')
})

module.exports = app
