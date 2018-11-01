'use strict'

const LogError = require('../LogError')
const {is} = require('../../../Toolbox')
const defaults = require('../../config')

const LEVELS = defaults.levels
const MAX = defaults.prioMax
const MIN = defaults.prioMin

/**
 * Parse input to find a valid log priority between
 * minimum and maximum thresholds, inclusive.
 * @param {Object} log                   - Log Data object.
 * @param {(Number|String)} log.priority - The requested priority or level.
 * @returns {Object} log                 - Log Data object.
 */
function getPriority (log) {
  const input = log.priority
  // accept only Numbers or Strings
  if (!is.number(input) && !is.string(input)) {
    throw new LogError('priority:type', typeof input)
  }

  // input is an Integer
  if (is.integer(input)) {
    let priority = Number(input)
    /* If priority is out of bounds, reset to nearest limit.
      * Optionally, we can throw errors instead. */
    if (priority < MIN) {priority = MIN}
    if (priority > MAX) {priority = MAX}
    log.priority = priority
    return log
  }

  // input is a string containing a preset log level
  if (LEVELS.hasOwnProperty(input)) {
    log.priority = LEVELS[input]
    return log
  }

  // input is an invalid String or Number
  throw new LogError({
    type: 'priority:range',
    expected: [MIN, MAX, Object.keys(LEVELS).join(', ')],
    received: [typeof input, String(input)],
  })
}

module.exports = getPriority
