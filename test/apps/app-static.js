var express = require('express')
var app = express()
var Mounter = require('../../')
var path = require('path')

Mounter.proxy(app)

app.use('/', express.static(
  path.resolve(__dirname, 'static/')
))

module.exports = app
