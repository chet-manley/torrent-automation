'use strict'


const Functional = {
  compose (...functions) {
    return data => functions.reduceRight(
      (value, func) => func(value),
      data
    )
  },

  unary (fn) {
    return function decorator (...args) {
      return fn.call(this, args[0])
    }
  },

  map (fn) {
    return function decorator (data) {
      return Array.prototype.map.call(data, fn)
    }
  },
}

module.exports = Functional
