'use strict'

const {compose} = require('../../../Toolbox')
const getMessage = require('./getMessage')
const getPriority = require('./getPriority')
const getPermission = require('./getPermission')

const prepareLog = compose(getMessage, getPriority, getPermission)

module.exports = prepareLog
