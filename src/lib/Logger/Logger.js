'use strict'

const config = require('../../config')
const winston = require('winston')

const transports = [
  new winston.transports.Console({
    colorize: false,
    json: false,
    handleExceptions: !config.throw,
  })
]

const logger = winston.createLogger({
  level: config.priority,
  levels: config.levels,
  transports,
  exitOnError: true,
  silent: !config.enabled
})

function newLogger (options = {}) {
  return
}

module.exports = Logger || createLogger()
