'use strict'

const joi = require('joi')
const defaults = require('../default.config.json').logger

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
  'info': 6,
  'information': 6,
  'verbose': 6,
  'debug': 7
}

const priorities = Object.values(defaults.levels)
const PRIORITY_MIN = priorities.reduce( (x,y) => Math.min(x,y) )
const PRIORITY_MAX = priorities.reduce( (x,y) => Math.max(x,y) )

const schema = joi.object().keys({
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
  VERBOSE: joi.boolean()
    .truthy(['yes', 'Y'])
    .falsy(['no', 'N'])
    .default(defaults.verbose),
})
  .unknown()

// combine yarg arguments with environment variables (argv > env > defaults)
const data = Object.assign({}, process.env, process.argv)

// check validity of options
const { error, value: options } = joi.validate(data, schema)
if (error) {
  throw new Error(`Logger config validation failed: ${error}`)
}

function getPriority (level, verbose) {
  const priority = typeof level === 'number' ? level : defaults.levels[level.toLowerCase()]
  return verbose && defaults.levels.verbose > priority ? defaults.levels.verbose : priority
}

const config = Object.assign({}, defaults, {
  enabled: options.LOG_ENABLED && !options.LOG_DISABLED,
  priority: getPriority(options.LOG_LEVEL, options.VERBOSE),
})

module.exports = Object.freeze(config)
