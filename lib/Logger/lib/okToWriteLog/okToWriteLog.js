'use strict'

const canWriteLog = require('./canWriteLog')
const allowedToWriteLog = require('./allowedToWriteLog')

async function okToWriteLog (log) {
  return await [null, log]
}

module.exports = okToWriteLog
