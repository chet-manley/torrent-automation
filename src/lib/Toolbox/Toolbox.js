'use strict'

const Functional = require('./Functional')
const Validate = require('./Validate')

function to (promise) {
  return promise.then(data => [null, data]).catch(err => [err])
}

module.exports = Object.freeze({
  ...Functional,
  is: Validate,
  to,
})
