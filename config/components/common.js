'use strict'

const joi = require('joi')
//defaults
const environments = [
  'dev',
  'devel',
  'development',
  'prod',
  'production',
  'prov',
  'provision',
  'test',
]

const envSchema = joi.object().keys({
  NODE_ENV: joi.string()
    .allow(environments)
    .required(),
})
  .unknown()

const { error, value: env } = joi.validate(process.env, envSchema)
if (error) {
  throw new Error(`Config validation failed: ${error.message}`)
}

const config = {
  env: env.NODE_ENV
}

module.exports = config
