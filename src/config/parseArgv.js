'use strict'

const yargs = require('yargs')

process.argv = yargs.options({
  'd': {
    alias: ['debug'],
    describe: 'Debug output',
    type: 'boolean',
  },
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
    alias: ['verbose'],
    describe: 'Verbose output',
    type: 'count',
  },
}).argv

module.exports = Object.freeze(process.argv)
