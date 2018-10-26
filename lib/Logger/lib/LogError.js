'use strict'

class LogError extends Error {
  constructor (type = 'default', ...params) {
    // pass remaining parameters to parent Error constructor
    super(...params)

    // maintain a proper stack trace for where this error was thrown
    Error.captureStackTrace && Error.captureStackTrace(this, LogError)

    // my custom error information
    this.name = 'LogError'
    this.type = type
  }
}

module.exports = LogError
