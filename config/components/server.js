'use strict'

const joi = require('joi')
const apiPort = 9000
const port = 80

const envSchema = joi.object().keys({
  API_PORT: joi.number()
    .port()
    .default(apiPort),
  PORT: joi.number()
    .port()
    .default(port),
})
  .unknown()

const { error, value: env } = joi.validate(process.env, envSchema)
if (error) {
  throw new Error(`Config validation failed: ${error.message}`)
}

const config = {
  server: {
    api: {
      port: env.API_PORT,
    },
    web: {
      port: env.PORT,
    },
  },
}

module.exports = config
