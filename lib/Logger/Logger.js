/* eslint-disable no-console */
'use strict'

const config = require('./config')

const LoggerPrototype = {
  get level () {
    return this.priority
  },
  set level (prio) {
    return this.priority = prio
  },

  log (message, priority = config.priority) {
    // message is required
    if (arguments.length === 0) {
      return false
    }
    // logging is not enabled
    if (!this._enabled) {
      return false
    }
    const log = {message, priority}

    console.log(`<${log.priority}>${log.message}`)
    return true
  }
}

// add default configuration to prototype
Object.assign(LoggerPrototype, config)

// create unary wrapper methods for each priority's level(s)
for (const [level, priority] of Object.entries(config.levels)) {
  LoggerPrototype[level] = function (message) {
    return this.log(message, priority)
  }
}

function Logger (cfg = {}) {
  const newLogger = Object.create(LoggerPrototype)
  Object.assign(newLogger, cfg)
  return newLogger
}

module.exports = Logger
