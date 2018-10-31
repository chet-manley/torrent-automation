'use strict'

function parseLogErrorParams (arg0, msg, error, presets) {
  // no arguments sent or message was passed in object
  if (typeof arg0 === 'undefined' || (typeof msg === 'string' && msg.length)) {
    return {message: msg, type: error}
  }

  let message, type
  // preset error passed in string
  if (presets[arg0]) {
    type = arg0
    message = presets[type]

  // message passed in string
  } else if (typeof arg0 === 'string') {
    type = error
    message = arg0

  // preset error was passed in object
  } else if (presets[error]) {
    type = error
    message = presets[error]

  // Should never throw as long as "error" defaults to a preset.
  } else {
    throw new Error('Constructor is missing a valid error type or message.')
  }

  return {message, type}
}

module.exports = parseLogErrorParams
