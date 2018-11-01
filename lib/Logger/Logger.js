/* eslint-disable no-console */
'use strict'

const config = require('./config')
const okToWriteLog = require('./lib/okToWriteLog')

const LoggerPrototype = {
  get name () {return 'Logger'},
  get level () {
    return this.priority
  },
  set level (prio) {
    return this.priority = prio
  },

  async log (message, priority = config.priority) {
    // message is required
    if (arguments.length === 0) {return false}
    // prepare log data
    let [error, log] = await okToWriteLog({
      message, priority, allowed: false
    })
    // not able to log this message
    if (error) {
      if (this.levels.error <= this.priority) {
        this.log(error.toString(), this.levels.error)
      }
      if (this.throw) {throw error}
      return error
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
  const newLogger = Object.create(LoggerPrototype)
  Object.assign(newLogger, cfg)
  return newLogger
}

module.exports = Logger
