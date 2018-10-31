/* eslint-disable no-param-reassign */
'use strict'

const {format: printf} = require('util')
const config = require('./config')
const parseParams = require('./parseLogErrorParams')

const presets = config.presets

/** Custom Error class for log related errors */
class LogError extends Error {
  /**
   * Creates an instance of LogError.
   * @param {(String|Object)} [options] - Message string or options object.
   * @param {String} [options.type]     - LogError error type.
   * @param {Array} [options.expected]  - Expected values.
   * @param {Array} [options.received]  - Received values.
   * @param {String} [options.message]  - Log error message.
   */
  constructor ({
    type = 'default',
    expected = [],
    received = [],
    message = '',
  } = {}, ...params) {
    const error = parseParams(arguments[0], message, type, presets)

    // pass formatted message to Error constructor
    super(printf(error.message, ...expected, ...received, ...params))

    // maintain a proper stack trace for where this error was thrown
    Error.captureStackTrace && Error.captureStackTrace(this, LogError)

    // my custom error information
    this.name = 'LogError'
    this.type = error.type
  }
}

module.exports = LogError
