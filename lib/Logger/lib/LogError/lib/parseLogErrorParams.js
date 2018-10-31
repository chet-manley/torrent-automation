'use strict'

function parseLogErrorParams (arg0, msg, error, preset, presets) {
  // no arguments sent or message was passed in object
  if (typeof arg0 === 'undefined' || (typeof msg === 'string' && msg.length)) {
    return {message: msg, type: error}
  }

  let message, type
  // preset was passed as string
  if (presets[arg0]) {
    type = arg0
    message = presets[type]

  // message was passed in string
  } else if (typeof arg0 === 'string') {
    message = arg0

  // preset was passed in object
  } else if (presets[preset]) {
    // do not overwrite type if defined
    type = error ? error : preset
    message = presets[preset]

  // Should never throw as long as "preset" has a default.
  } else {
    throw new Error('Constructor is missing a valid error type or message.')
  }

  return {message, type}
}

module.exports = parseLogErrorParams
