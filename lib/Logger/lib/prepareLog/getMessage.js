'use strict'

const LogError = require('../LogError')
const {is} = require('../../../Toolbox')

/**
 * Parse input for a non-empty String, or a
 * toString method that returns a non-empty String.
 * @param {Object} log    - Log Data object.
 * @param {*} log.message - The requested message.
 * @returns {Object} log  - Log Data object.
 */
function getMessage (log) {
  // fail if input cannot create a string
  if (!is.toString(log.message)) {
    throw new LogError('message:type', typeof log.message)
  }

  log.message = String(log.message)
  // message is empty
  if (is.emptyString(log.message)) {
    throw new LogError('message:empty')
  }

  return log
}

module.exports = getMessage
