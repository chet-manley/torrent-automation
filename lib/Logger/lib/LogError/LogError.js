'use strict'

const {format: printf} = require('util')
const cfg = require('./config')
const presets = cfg.presets

/** Custom Error class for log related errors */
class LogError extends Error {
  /**
   * Creates an instance of LogError.
   * @param {(String|Object)} [options] - Message string or option object.
   * @param {String} [options.type]     - Predefined log error type.
   * @param {Array} [options.expected]  - Expected values.
   * @param {Array} [options.received]  - Received values.
   */
  constructor ({
    type = 'default',
    expected = [],
    received = []
  } = {}, ...params) {
    let message

    // string argument passed
    if (arguments.length && typeof arguments[0] === 'string') {
      // the string is a valid error type
      if (presets[arguments[0]]) {
        /* eslint-disable-next-line no-param-reassign */
        type = arguments[0]
        message = presets[type]
      // the string is the error message
      } else {
        message = arguments[0]
      }
    // object or no argument passed
    } else {
      if (!presets[type]) {
        throw new Error('Constructor call is missing a valid error type.')
      }
      message = presets[type]
    }

    // format message
    message = printf(message, ...expected, ...received, ...params)

    // pass message to Error constructor
    super(message)

    // maintain a proper stack trace for where this error was thrown
    Error.captureStackTrace && Error.captureStackTrace(this, LogError)

    // my custom error information
    this.name = 'LogError'
    this.type = type
  }
}

module.exports = LogError
