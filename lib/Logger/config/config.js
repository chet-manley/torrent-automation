'use strict'

const defaults = require('./default.config.json')

const priorities = Object.values(defaults.levels)
const config = {
  prioMin: priorities.reduce( (x,y) => Math.min(x,y) ),
  prioMax: priorities.reduce( (x,y) => Math.max(x,y) ),
}

module.exports = Object.assign({}, defaults, config)
