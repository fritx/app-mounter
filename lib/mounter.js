/**
 * Module dependencies
 */
var express = require('express')
var methods = require('methods')

var slice = Array.prototype.slice

/**
 * Expose `Mounter`
 */
module.exports = Mounter

/**
 * Initialize `Mounter`
 * @api public
 */
function Mounter(){
  this.mainApp = express()
}

/**
 * Proxy an app, before mounting
 * @api public
 */
Mounter.proxy = function(app){
  // stage routing arguments
  app._stagingUse = []
  app._stagingRoute = []
  app.lazyrouter()

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
}

/**
 * Mount an app
 * @api public
 */
Mounter.prototype.mount = function(path, app){
  // apply routing arguments
  var mainApp = this.mainApp

  app._stagingUse.forEach(function(item){
    item[0] = prependPath(path, item[0])
    mainApp.use.apply(mainApp, item[0])
  })

  app._stagingRoute.forEach(function(item){
    item[1] = prependPath(path, item[1])
    mainApp[item[0]].apply(mainApp, item[1])
  })
}

/**
 * Link to mainApp.listen
 * @api public
 */
Mounter.prototype.listen = function(){
  this.mainApp.listen.apply(this.mainApp, arguments)
}

/**
 * Prepend a path to not exists
 * @api private
 */
function prependPath(path, args){
  if (typeof args[0] !== 'string') {
    args = ['/'].concat(args)
  }
  args[0] = path + args[0]
  return args
}
