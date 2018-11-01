'use strict'

async function allowedToWriteLog (log) {
  return await [null, log]
}

module.exports = allowedToWriteLog
