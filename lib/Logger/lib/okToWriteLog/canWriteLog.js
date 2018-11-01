'use strict'

const getMessage = require('./getMessage')
const getPriority = require('./getPriority')

async function canWriteLog (log) {
  log.message = await getMessage(log.message)
  log.priority = await getPriority(log.priority)
  return log
}

module.exports = canWriteLog
