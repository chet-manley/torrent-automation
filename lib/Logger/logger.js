/* eslint-disable no-console */
'use strict'

//const cfg = require('./config')
const cfg = {
  'enabled': true,
  'level': {
    'default': 4,
    'max': 7,
    'min': 0,
  },
  'levels': {
    'emerg': 0,
    'emergency': 0,
    'alert': 1,
    'crit': 2,
    'critical': 2,
    'err': 3,
    'error': 3,
    'warn': 4,
    'warning': 4,
    'notice': 5,
    'info': 6,
    'information': 6,
    'debug': 7,
  }
}

const ENABLED       = cfg.enabled
const LEVEL_DEFAULT = cfg.level.default
const LEVEL_MIN     = cfg.level.min
const LEVEL_MAX     = cfg.level.max
const LEVELS        = cfg.levels

class Logger {
  constructor ({enabled = ENABLED, level = LEVEL_DEFAULT} = {}) {
    this._enabled = enabled
    this._level = level
    /*
    ({
      enabled: this._enabled = ENABLED,
      level: this._level = LEVEL_DEFAULT
    } = options)
    */
    if (LEVELS.info <= this._level) {
      Logger.log(LEVELS.info, 'Initialized Logger service.')
    }
  }

  get enabled () {
    return this._enabled
  }
  set enabled (bool) {
    return this._enabled = Boolean(bool)
  }

  get level () {
    return this._level
  }
  set level (level) {
    let priority = Logger.getPriority(level)
    if (typeof priority === 'number') {this._level = priority}
    return this._level
  }

  static get LEVEL_MIN () {
    return LEVEL_MIN
  }

  static get LEVEL_MAX () {
    return LEVEL_MAX
  }

  static get LEVELS () {
    return LEVELS
  }

  /**
   * Normalize input to either a valid Integer or NaN.
   * Priority levels between minimum and maximum thresholds, inclusive.
   *
   * @static
   * @method
   * @memberof Logger
   * @param {*} level
   * @returns {Number|NaN} priority level as Integer
   */
  static normalizeLevel (level) {
    // prevent Boolean and empty String from being cast to valid Numbers
    if (typeof level === 'boolean' || level === '') {return NaN}
    // level is an Integer or String containing an integer
    if (Number.isInteger(Number(level))) {
      let number = Number(level)
      // if number is out of bounds, reset to nearest limit
      if (number < this.LEVEL_MIN) {number = this.LEVEL_MIN}
      if (number > this.LEVEL_MAX) {number = this.LEVEL_MAX}
      return number
    }
    // level is a String and a predefined level
    if (typeof level === 'string' && this.LEVELS.hasOwnProperty(level)) {
      return this.LEVELS[level]
    }
    // level was invalid
    return NaN
  }

  /**
   * Validate input is a whole number, and is between
   * minimum and maximum priority levels, inclusive.
   *
   * @static
   * @method
   * @memberof Logger
   * @param {Number} level
   * @returns {Boolean} validity
   */
  static isValidLevel (level) {
    return Number.isInteger(level)
          && level >= this.LEVEL_MIN
          && level <= this.LEVEL_MAX
  }

  /**
   * Normalize and validate input and return
   * priority level as positive Integer or Error on failure.
   *
   * @static
   * @method
   * @memberof Logger
   * @param {String|Number} level
   * @returns {Number|Error} Number primitive or Error object
   */
  static getPriority (level) {
    let error = false
    const priority = this.normalizeLevel(level)
    // Error on invalid or missing priority level
    if (!this.isValidLevel(priority)) {
      error = new RangeError(`Invalid log priority level. Expected <Number> between ${this.LEVEL_MIN} and ${this.LEVEL_MAX} inclusive, or one of <String> [${Object.keys(this.LEVELS).join(', ')}]. Received <${typeof level}>:${String(level)}.`)
    }
    return {error, priority}
  }

  /**
   * Validate input and return message as string or Error on failure.
   *
   * @static
   * @method
   * @memberof Logger
   * @param {*} message
   * @returns {Object} String primitive or Error object
   */
  static validateMessage (message) {
    let error = false
    // invalid message type
    if (typeof message !== 'string') {
      error = new TypeError(`Invalid log message type. Expected <String>. Received <${typeof message}>.`)
    // message is empty
    } else if (message.length === 0) {
      error = new RangeError(`Invalid log message length. Expected greater than 0. Received ${message.length}.`)
    }
    return {error, message: String(message)}
  }

  static log () {
    let level, priority, message, fields, error
    // arguments sent as object
    if (typeof arguments[0] === 'object') {
      ({level, priority, message} = arguments[0])
    // arguments sent individually
    } else {
      [level, message] = arguments
    }

    // get priority level
    if (typeof priority !== 'number') {
      ({error, priority} = this.getPriority(level))
    }
    // log error for invalid priority level
    if (error) {return this.error(this.LEVELS.error, error)}

    // validate message
    ({error, message} = this.validateMessage(message))
    // log warning for invalid message
    if (error) {this.error(this.LEVELS.warn, error)}

    // output log
    console.log(`<${priority}>${message}`)
    return true
  }

  static error (level, error) {
    // error is a message String
    if (typeof error === 'string') {
      this.log(level, error)
      return new Error(error)
    }
    // Error instance or regular object with message property
    if (error instanceof Error || error.hasOwnProperty('message')) {
      this.log(level, error.message)
      return error instanceof Error ? error : new Error(error.message)
    }
    // create, log, and return Error for bad argument
    let err = new TypeError(`Cannot parse unknown error argument. Expected <String> or <Error>. Received <${typeof error}>.`)
    this.log(this.LEVELS.error, err.message)
    return err
  }

  log (level, message) {
    // logging is disabled
    if (!this._enabled) {return false}
    // get log priority level
    let {error, priority} = Logger.getPriority(level)
    // error on invalid priority level
    if (error) {
      if (LEVELS.error <= this._level) {Logger.error(LEVELS.error, error)}
      return error
    }
    // message falls below priority level
    if (priority > this._level) {return false}

    // validate message
    ({error, message} = Logger.validateMessage(message))
    // warn on invalid message
    if (error) {
      if (LEVELS.warn <= this._level) {Logger.error(LEVELS.warn, error)}
    }

    // log the message
    return Logger.log({priority, message})
  }
}

// add helper methods to Class prototype
Object.keys(LEVELS).forEach(method => {
  Logger.prototype[method] = function (message) {
    return this.log(LEVELS[method], message)
  }
})

module.exports = Logger
