'use strict'

const joi = require('joi')
// defaults
const LEVEL_MIN = 0
const LEVEL_MAX = 7
const levels = {
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
  'default': 4,
}

const envSchema = joi.object().keys({
  LOG_LEVEL: joi.alternatives().try([
    joi.string()
      .valid([...Object.keys(levels)])
      .insensitive(true),
    joi.number()
      .integer()
      .min(LEVEL_MIN)
      .max(LEVEL_MAX),
  ])
    .default(levels.default),
  LOG_ENABLED: joi.boolean()
    .truthy(['yes', 'Y'])
    .falsy(['no', 'N'])
    .default(true),
})
  .unknown()

const { error, value: env } = joi.validate(process.env, envSchema)
if (error) {
  throw new Error(`Config validation failed: ${error.message}`)
}

const config = {
  logger: {
    enabled: env.LOG_ENABLED,
    level: typeof env.LOG_LEVEL === 'number'
      ? env.LOG_LEVEL
      : levels[env.LOG_LEVEL],
    levels,
  },
}

module.exports = config
