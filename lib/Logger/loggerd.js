/* eslint-disable no-console */
'use strict'

const {is} = require('../Validate')
const cfg = require('./config')

const ENABLED       = cfg.enabled
const LEVEL_DEFAULT = cfg.level.default
const LEVEL_MIN     = cfg.level.min
const LEVEL_MAX     = cfg.level.max
const LEVELS        = cfg.levels

function validationError (message, expected, received) {
  let error = message
  if (expected.length) {error += ` Expected ${expected}.`}
  if (received.length) {error += ` Received ${received}.`}
  return new Error(error)
}

/** Class to enable logging in a systemd environment. */
class Logger {
  /**
   * Creates an instance of Logger.
   * @param {Object} [options]                - Optional config object.
   * @param {Boolean} [options.enabled]       - Logging enabled.
   * @param {(Number|String)} [options.level] - Logging priority level.
   */
  constructor ({enabled = ENABLED, level = LEVEL_DEFAULT} = {}) {
    this._enabled = enabled
    this._level = level
    if (LEVELS.info <= this._level) {
      this.log(LEVELS.info, 'Initialized Logger service.')
    }
  }

  /**
   * Get current value of private property _enabled.
   * @readonly
   * @returns {Boolean} Whether or not logging is enabled.
   */
  get enabled () {
    return this._enabled
  }

  /**
   * Get current value of private property _level.
   * @readonly
   * @returns {Number} Logging priority level.
   */
  get level () {
    return this._level
  }

  /**
   * Get value of minimum allowed log level.
   * @readonly
   * @returns {Number} Minimum allowed level.
   */
  static get LEVEL_MIN () {
    return LEVEL_MIN
  }

  /**
   * Get value of maximum allowed log level.
   * @readonly
   * @returns {Number} Maximum allowed level.
   */
  static get LEVEL_MAX () {
    return LEVEL_MAX
  }

  /**
   * Get all allowed log priority aliases.
   * @readonly
   * @returns {Object} Allowed log priority aliases.
   */
  static get LEVELS () {
    return Object.assign({}, LEVELS)
  }

  /**
   * Parse input to find a valid priority level between
   * minimum and maximum thresholds, inclusive.
   * @param {(Number|String)} level - The requested priority level.
   * @returns {Promise<Number>} Represents priority level as Integer.
   */
  static parseLevel (level) {
    const failed = {
      'range': new RangeError(validationError('Invalid log priority level.',
        `<Integer> between ${this.LEVEL_MIN} and ${this.LEVEL_MAX} inclusive, or one of <String> [${Object.keys(this.LEVELS).join(', ')}]`,
        `<${typeof level}>:"${String(level)}"`).message),
      'type': new TypeError(validationError('Invalid log priority level.',
        '<Number> or <String>',
        `<${typeof level}>`).message),
    }

    return new Promise(resolve => {
      // accept only Numbers or Strings
      if (!is.number(level) && !is.string(level)) {throw failed.type}

      // level is an Integer
      if (is.Integer(level)) {
        let number = Number(level)
        // if number is out of bounds, reset to nearest limit
        // or we can optionally throw range errors here instead
        if (number < this.LEVEL_MIN) {number = this.LEVEL_MIN}
        if (number > this.LEVEL_MAX) {number = this.LEVEL_MAX}
        return resolve(number)
      }

      // level is a String containing a predefined priority
      if (!is.emptyString(level) && this.LEVELS.hasOwnProperty(level)) {
        return resolve(this.LEVELS[level])
      }

      // level is an invalid String or Number
      throw failed.range
    })
  }

  /**
   * Validate input is a non-empty String
   * @static
   * @param {String} message - The requested log message.
   * @returns {Promise<String>} Represents the final log message.
   */
  static isMessage (message) {
    let failed = 'Invalid log message. Expected non-empty <String>. Received '

    return new Promise(resolve => {
      // message is not a string
      if (!is.string(message)) {
        throw new TypeError(`${failed} <${typeof message}>.`)
      }
      // message is empty string
      if (is.emptyString(message)) {
        throw new RangeError(`${failed} "".`)
      }
      // message is valid
      return resolve(String(message))
    })
  }

  async log (level, message) {
    // logging not enabled
    if (!this._enabled) {return false}
    let priority

    try {
      // get log priority level
      priority = await Logger.parseLevel(level)
      // message priority falls below set priority level
      if (priority > this._level) {return false}
      // validate log message
      await Logger.isMessage(message)
    } catch (error) {
      if (LEVELS.error <= this._level) {
        this.log(LEVELS.error, error.message)
      }
      throw error
    }

    // log the message
    console.log(`<${priority}>${String(message)}`)
    return true
  }
}

// add convienence methods to Class prototype
Object.keys(LEVELS).forEach(method => {
  Logger.prototype[method] = function (message) {
    return this.log(LEVELS[method], message)
  }
})

module.exports = Logger