'use strict'

const ableToWriteLog = require('./ableToWriteLog')
const allowedToWriteLog = require('./allowedToWriteLog')

async function okToWriteLog (log) {
  try {
    await ableToWriteLog(log)
    await allowedToWriteLog(log)
  } catch (e) {
    return [e]
  }

  return [null, log]
}

module.exports = okToWriteLog
