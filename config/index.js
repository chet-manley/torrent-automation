/* eslint-disable no-console */
'use strict'

// load .env in local development
if ( /^dev(el)?(op)?(ment)?$/gi.test(process.env.NODE_ENV) ) {
  console.log('Loading development environment defaults.')
  let {error} = require('dotenv').config({ silent: true })
  if (error) {
    //throw new Error(`Cannot load config: ${error}`)
    console.error(new Error(`Cannot load config: ${error}`))
  }
}

const processType = process.env.PROCESS_TYPE

let config
try {
  config = require(`./${processType}`)
} catch (ex) {
  if (ex.code === 'MODULE_NOT_FOUND') {
    throw new Error(`No config for: ${processType}`)
  }

  throw ex
}

module.exports = config
