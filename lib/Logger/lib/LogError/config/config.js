'use strict'

const presets = require('./preset.errors.json')

const config = {
  name: 'LogError',
  presets,
}

module.exports = Object.assign({}, config)
