'use strict'

const joi = require('joi')

const envSchema = joi.object().keys({
  DB_URI: joi.string()
    .uri()
    .required(),
  DB_PORT: joi.number()
    .port()
    .required(),
})
  .unknown()

const { error, value: env } = joi.validate(process.env, envSchema)
if (error) {
  throw new Error(`Config validation failed: ${error.message}`)
}

const config = {
  database: {
    uri: new URL(env.DB_URI),
  },
}

module.exports = config
