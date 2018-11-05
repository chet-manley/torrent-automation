'use strict'

const joi = require('joi')

// combine yarg arguments with environment variables (argv > env > defaults)
const argenv = Object.assign({}, process.env, process.argv)

// define preset environments
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

// build schema to validate input against
const schema = joi.object().keys({
  NODE_ENV: joi.string()
    .allow(environments)
    .required(),
})
  .unknown()


// validate options
const { error, value: options } = joi.validate(argenv, schema)
if (error) {
  throw new Error(`Common config validation failed: ${error}`)
}

const config = {
  env: options.NODE_ENV
}

module.exports = Object.freeze(config)
