'use strict'

require('./parseArgv')

// load .env in development environments
if ( /^dev(el)?(op)?(ment)?$/gi.test(process.env.NODE_ENV) ) {
  let {error} = require('./parseEnv')
  /* eslint-disable-next-line no-console */
  console.log(`Development environment config ${error || 'loaded'}.`)
}

const {PROCESS_TYPE} = process.env || 'cli'
let config

try {
  config = require(`./processes/${PROCESS_TYPE}`)
} catch (ex) {
  if (ex.code === 'MODULE_NOT_FOUND') {
    throw new Error(`No config for process: ${PROCESS_TYPE}`)
  }

  throw ex
}

module.exports = config
