/**
 * Module dependencies
 */
var Mounter = require('../')
var request = require('request')
var assert = require('assert')
var path = require('path')
var fs = require('fs')

/**
 * Module variables
 */
var port = 8077
var host = 'http://localhost:'+ port

/**
 * Testing on app-mounter
 */
describe('app-mounter', function(){

  var mounter = new Mounter()

  it('mounts apps', function(done){
    mounter.mount('/hello', require('./apps/app-hello'))
    mounter.mount('/static', require('./apps/app-static'))
    mounter.listen(port, function(err){
      assert.equal(err, null)
      done()
    })
  })

  it('works app-hello', function(done){
    request({
      method: 'GET',
      url: host +'/hello'
    }, function(err, res, body){
      assert.equal(body, 'hello')
      done()
    })
  })

  it('works app-static', function(done){
    request({
      method: 'GET',
      url: host +'/static'
    }, function(err, res, body){
      assert.equal(body, fs.readFileSync(
        path.resolve(__dirname, './apps/static/index.html')
      ).toString())
      done()
    })
  })

})
