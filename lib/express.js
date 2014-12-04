var express = require('express')
var methods = require('methods')
var slice = Array.prototype.slice

/**
 * Override fn `createApplication`
 * Store routes before mounted
 */
express = (function(fn){
  function createApplication(){
    var args = arguments
    var app = fn.apply(null, args)

    // stage routing arguments
    app._stagingUse = []
    app._stagingRoute = []

    app.use = function(){
      var args = slice.call(arguments)
      app._stagingUse.push([slice.call(arguments)])
    }


    methods.concat('all').forEach(function(method){
      app[method] = function(){
        var args = slice.call(arguments)
        app._stagingRoute.push([method, args])
      }
    })

    return app
  }

  Object.keys(fn).forEach(function(key){
    createApplication[key] = fn[key]
  })

  return createApplication
})(express)

module.exports = express
