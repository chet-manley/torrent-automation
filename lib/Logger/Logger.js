/* eslint-disable no-console */
'use strict'

const config = require('./config')
const LogData = require('./lib/LogData')
const prepareLog = require('./lib/prepareLog')

const LoggerPrototype = {
  get name () {return 'Logger'},
  get level () {
    return this.priority
  },
  set level (prio) {
    return this.priority = prio
  },

  log (message, priority = config.priority) {
    // message is required
    if (arguments.length === 0) {return false}

    let log
    try {
      // prepare log data
      log = prepareLog({
        message, priority, allowed: true,
        instance: {
          enabled: this.enabled,
          priority: this.priority,
        }
      })
    // not able to log this message
    } catch (e) {
      if (this.levels.error <= this.priority) {
        this.log(e.toString(), this.levels.error)
      }
      if (this.throw) {throw e}
      return e
    }

    // not allowed to log this message
    if (!log.allowed) {return false}

    // write the log
    console.log(`<${log.priority}>${log.message}`)
    return true
  }
}

// add default configuration to prototype
Object.assign(LoggerPrototype, {
  enabled: config.enabled,
  priority: config.priority,
  throw: config.throw,
},
{defaults: Object.freeze(config)},)

// create unary wrapper methods for each priority's level(s)
for (const [level, priority] of Object.entries(config.levels)) {
  LoggerPrototype[level] = function (message) {
    return this.log(message, priority)
  }
}

// the Logger Factory
function Logger (cfg = {}) {
  const logger = Object.create(LoggerPrototype)
  Object.assign(logger, cfg)
  return logger
}

module.exports = Logger
