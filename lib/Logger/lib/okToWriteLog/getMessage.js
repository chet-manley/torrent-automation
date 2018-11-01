'use strict'

const LogError = require('../LogError')
const {is} = require('../../../Toolbox')

/**
 * Parse input for a non-empty String, or a
 * toString method that returns a non-empty String.
 * @param {*} input - The requested log message.
 * @returns {Promise<String>} Represents log message as String literal.
 */
function getMessage (input) {
  return new Promise(resolve => {
    // fail if input cannot create a string
    if (!is.toString(input)) {
      throw new LogError('message:type', typeof input)
    }

    const message = String(input)
    // message is empty
    if (is.emptyString(message)) {
      throw new LogError('message:empty')
    }

    // message is valid
    return resolve(message)
  })
}

module.exports = getMessage
