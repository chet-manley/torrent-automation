'use strict'

const presets = require('./preset.errors.json')

const config = {
  presets
}

/*
config.errors.level.range.expected = `<Integer> between ${defaults.level.min} and ${defaults.level.max} inclusive, or one of <String> [${Object.keys(defaults.levels).join(', ')}]`
*/

module.exports = Object.assign({}, config)
