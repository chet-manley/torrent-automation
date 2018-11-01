'use strict'

const {format: printf} = require('util')
const LogError = require('./LogError')
const PRESETS = require('./config/preset.errors')

const DEFAULT_MSG = ''
const DEFAULT_TYPE = undefined
const DEFAULT_ERROR = new LogError
const ERROR_MSG = 'test-message-%s'
const ERROR_DEFAULT = 'default'
const ERROR = new LogError(ERROR_MSG)
const PRESET_ERROR = 'message:empty'
const NAME = DEFAULT_ERROR.name

describe(`${NAME} Class`, () => {
  it('should extend Error class', () => {
    expect(Error.prototype.isPrototypeOf(LogError.prototype)).toBe(true)
  })

  describe(`${NAME} Constructor`, () => {
    it(`should return a new ${NAME} Object`, () => {
      expect(Object.getPrototypeOf(ERROR) === LogError.prototype).toBe(true)
      expect(ERROR instanceof LogError).toBe(true)
    })

    it(`should return a default ${NAME} Object`, () => {
      expect(DEFAULT_ERROR.type).toBe(DEFAULT_TYPE)
      expect(DEFAULT_ERROR.message).toBe(DEFAULT_MSG)
    })

    it('should accept message as a string', () => {
      const error = new LogError(ERROR_MSG)
      expect(error.message).toBe(ERROR_MSG)
    })

    it('should accept message as property of an object', () => {
      const error = new LogError({message: ERROR_MSG})
      expect(error.message).toBe(ERROR_MSG)
    })

    it('should accept preset as a string', () => {
      const error = new LogError(PRESET_ERROR)
      expect(error.type).toBe(PRESET_ERROR)
    })

    it('should accept preset as property of an object', () => {
      const error = new LogError({preset: PRESET_ERROR})
      expect(error.type).toBe(PRESET_ERROR)
    })

    it('should not overwrite defined "type" property', () => {
      const args = [
        {type: 'test'},
        {type: 'test', message: ERROR_MSG},
        {type: 'test', preset: PRESET_ERROR},
      ]
      for (let arg of args) {
        const error = new LogError(arg)
        expect(error.type).toBe(arg.type)
      }
    })

    describe(`${NAME} Oject`, () => {
      it(`should provide a "name" property containing "${NAME}"`, () => {
        expect(ERROR.hasOwnProperty('name')).toBe(true)
        expect(ERROR.name).toBe(NAME)
      })

      it('should provide a "type" property', () => {
        expect(ERROR.hasOwnProperty('type')).toBe(true)
      })

      it('should provide a "stack" property with proper trace', () => {
        expect(ERROR.stack).toBeDefined()
        expect(ERROR.stack).toEqual(expect.stringContaining(NAME))
      })

      it(`should throw as a ${NAME} error`, () => {
        expect(() => {throw ERROR}).toThrow(LogError)
      })
    })

    describe('Preset error messages', () => {
      it('should return a "default" preset', () => {
        const error = new LogError(ERROR_DEFAULT)
        expect(error.type).toBe(ERROR_DEFAULT)
        expect(error.message).toBe(PRESETS.default)
      })

      it('should return a "priority:range" preset', () => {
        const expected = [0, 1, '[one, two, three]']
        const received = ['string', 'invalid']
        const error = new LogError({preset: 'priority:range', expected, received})
        expect(error.type).toBe('priority:range')
        expect(error.message).toBe(
          printf(PRESETS['priority:range'], ...expected, ...received)
        )
      })

      it('should return a "priority:type" preset', () => {
        const type = 'test'
        const error = new LogError({preset: 'priority:type', received: [type]})
        expect(error.type).toBe('priority:type')
        expect(error.message).toBe(
          printf(PRESETS['priority:type'], type)
        )
      })

      it('should return a "message:empty" preset', () => {
        const error = new LogError('message:empty')
        expect(error.type).toBe('message:empty')
        expect(error.message).toBe(PRESETS['message:empty'])
      })

      it('should return a "message:type" preset', () => {
        const type = 'test'
        const error = new LogError('message:type', type)
        expect(error.type).toBe('message:type')
        expect(error.message).toBe(
          printf(PRESETS['message:type'], type)
        )
      })
    })
  })
})
