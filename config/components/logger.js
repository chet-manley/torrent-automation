'use strict'

const joi = require('joi')
const defaults = require('../default.config.json').logger

// combine yarg arguments with environment variables (argv > env > defaults)
const argenv = Object.assign({}, process.env, process.argv)

// define level<->priority map
defaults.levels = {
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
  'verbose': 5,
  'info': 6,
  'information': 6,
  'debug': 7,
}

// define minimum and maximum log priorities
const priorities = Object.values(defaults.levels)
const PRIORITY_MIN = priorities.reduce( (x,y) => Math.min(x,y) )
const PRIORITY_MAX = priorities.reduce( (x,y) => Math.max(x,y) )

// build schema to validate input against
const schema = joi.object().keys({
  debug: joi.boolean()
    .truthy(['yes', 'Y'])
    .falsy(['no', 'N']),
  LOG_LEVEL: joi.alternatives().try([
    joi.string()
      .valid([...Object.keys(defaults.levels)])
      .insensitive(true),
    joi.number()
      .integer()
      .min(PRIORITY_MIN)
      .max(PRIORITY_MAX),
  ])
    .default(defaults.priority),
  LOG_ENABLED: joi.boolean()
    .truthy(['yes', 'Y'])
    .falsy(['no', 'N'])
    .default(defaults.enabled),
  LOG_DISABLED: joi.boolean()
    .truthy(['yes', 'Y'])
    .falsy(['no', 'N'])
    .default(!defaults.enabled),
  verbose: joi.number()
    .integer(),
})
  .unknown()

// validate options
const { error, value: options } = joi.validate(argenv, schema)
if (error) {
  throw new Error(`Logger config validation failed: ${error}`)
}

// returns the final log priority as an Integer
function getPriority (level, debug, verbose) {
  if (debug) {return defaults.levels.debug}
  let priority = typeof level === 'number' ? level : defaults.levels[level.toLowerCase()]
  if (verbose !== 0) {
    priority = Math.max(defaults.levels.verbose + (verbose - 1), priority)
  }
  return Math.min(priority, PRIORITY_MAX)
}

const config = Object.assign({}, defaults, {
  enabled: options.LOG_ENABLED && !options.LOG_DISABLED,
  priority: getPriority(options.LOG_LEVEL, options.debug, options.verbose),
})

module.exports = Object.freeze(config)
