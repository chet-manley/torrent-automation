'use strict'

const joi = require('joi')

const envSchema = joi.object().keys({
  QUEUE_URI: joi.string()
    .uri()
    .required(),
  QUEUE_PORT: joi.number()
    .port()
    .required(),
})
  .unknown()

const { error, value: env } = joi.validate(process.env, envSchema)
if (error) {
  throw new Error(`Config validation failed: ${error.message}`)
}

const config = {
  queue: {
    uri: new URL(env.QUEUE_URI),
  },
}

module.exports = config
