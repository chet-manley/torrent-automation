'use strict'

const dotenv = require('dotenv')
const yargs = require('yargs')

// parse argv
process.argv = yargs.options({
  'disable-log': {
    alias: [
      'LOG-DISABLED',
      'LOG_DISABLED',
    ],
    describe: 'Disable logging',
    type: 'boolean',
  },
  'env': {
    alias: [
      'NODE-ENV',
      'NODE_ENV',
    ],
    describe: 'Set working environment',
    type: 'string',
  },
  'log-level': {
    alias: [
      'LOG-PRIO',
      'LOG_PRIO',
      'LOG-PRIORITY',
      'LOG_PRIORITY',
      'LOG-LEVEL',
      'LOG_LEVEL',
    ],
    describe: 'Set log priority level',
    type: 'string',
  },
  'v': {
    alias: ['VERBOSE'],
    describe: 'Verbose log output',
    type: 'count',
  },
}).argv

// load .env in development environments
if ( /^dev(el)?(op)?(ment)?$/gi.test(process.env.NODE_ENV) ) {
  let {error} = dotenv.load()
  /* eslint-disable-next-line no-console */
  console.log(`Loading development environment config ${error ? 'failed' : 'successful'}.`)
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
