/**
 * Module dependencies
 */
var express = require('express')

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
 * Mount an app
 * @api public
 */
Mounter.prototype.mount = function(prefix, app){
  // apply routing arguments
  var mainApp = this.mainApp

  app._stagingUse.forEach(function(item){
    item[0] = prependPath(prefix, item[0])
    mainApp.use.apply(mainApp, item[0])
  })

  app._stagingRoute.forEach(function(item){
    item[1] = prependPath(prefix, item[1])
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
 * Prepend a prefix if not exists
 * @api private
 */
function prependPath(prefix, args){
  if (typeof args[0] === 'string') {
    args[0] = prefix + (
      args[0] === '/' ? '' : args[0]
    )
  } else {
    args.unshift(prefix)
  }
  return args
}
