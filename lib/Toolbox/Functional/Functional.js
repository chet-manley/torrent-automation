'use strict'

const Functional = {
  compose (...functions) {
    function next (value, func) {
      return func(value)
    }

    return function (data) {
      functions.reduce(next, data)
    }
  },
  pipe: this.compose,

  map (func) {
    return function mapDecorator (data) {
      return Array.prototype.map.call(data, func)
    }
  },

  prop (prop) {
    return function getProp (object) {
      return object[prop]
    }
  },

  unary (func) {
    return function unaryDecorator (...args) {
      return func.call(this, args[0])
    }
  },
}

module.exports = Functional
