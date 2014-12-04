# app-mounter

Mount your apps onto one server

## Idea

I wanted to mount different [express](https://github.com/strongloop/express) apps onto one server, each with it's prefix path. And I did't know how, so I created this.

## Usage

Create an app:

```js
// app1.js
var express = require('app-mounter/express')
var app = express()
app.get('/hello', function(req, res){
  res.send('hello')
})
module.exports = app
```

Mount an app in the main-app:

```js
// main-app.js
var Mounter = require('app-mounter')
var mounter = new Mounter()
mounter.mount('/app1', require('./app1'))
// Gonna mount more apps..
var server = mounter.listen(80, function(err){
  // Check http://localhost/app1/hello
  // --> hello
})
```
