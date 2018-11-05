'use strict'

const common = require('../components/common')
const logger = require('../components/logger')
const queue = require('../components/queue')

module.exports = Object.assign({}, common, logger, queue)
