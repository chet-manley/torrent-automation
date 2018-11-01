'use strict'

/**
 * Find out if we are allowed to emit this log.
 * @param {Object} log                   - Log Data object.
 * @param {(Number|String)} log.priority - The requested priority or level.
 * @returns {Object} log                 - Log Data object.
 */
function getPermission (log) {
  if (!log.instance.enabled || log.priority <= log.instance.priority) {
    log.allowed = false
  }
  return log
}

module.exports = getPermission
