# app-mounter

Mount your apps onto one server

## Idea

I wanted to mount different [express](https://github.com/strongloop/express) apps onto one server, each with it's prefix path. And I did't know how, so I created this.

## Usage

To proxy an app:

```js
// app1.js
var app = express()
var Mounter = require('app-mounter')
Mounter.proxy(app)
app.get('/hello', function(req, res){
  res.send('hello')
})
module.exports = app
```

To mount an app:

```js
// main-app.js
var Mounter = require('app-mounter')
var mounter = new Mounter()
mounter.mount('/app1', require('./app1'))
// Gonna mount more apps..
var server = mounter.listen(80, function(err){
  // Visit http://localhost/app1/hello
})
```
