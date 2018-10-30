'use strict'

const {format: printf} = require('util')
const LogError = require('./LogError')
const PRESETS = require('./config/preset.errors')

const MSGTXT = 'test-message-%s'
const error = new LogError(MSGTXT)
const NAME = error.name

describe(`${NAME} Class`, () => {
  it('should extend Error class', () => {
    expect(Error.prototype.isPrototypeOf(LogError.prototype)).toBe(true)
  })

  describe(`${NAME} Instance`, () => {
    it(`should return a new ${NAME} Object`, () => {
      expect(Object.getPrototypeOf(error) === LogError.prototype).toBe(true)
      expect(error instanceof LogError).toBe(true)
    })

    describe(`${NAME} Oject`, () => {
      it('should contain a custom "name" property', () => {
        expect(error.name).toBe(NAME)
      })

      it('should contain a custom "type" property', () => {
        expect(error.type).toBe('default')
      })

      it('should contain a proper stack', () => {
        expect(error.stack).toBeDefined()
        expect(error.stack).toEqual(expect.stringContaining(NAME))
      })

      it(`should throw as a ${NAME} with a custom message`, () => {
        expect(() => {throw error}).toThrow(LogError)
        expect(() => {throw error}).toThrow(MSGTXT)
      })
    })

    describe('Preset error messages', () => {
      it('should return a "default" preset', () => {
        const testError = new LogError('default')
        expect(testError.type).toBe('default')
        expect(testError.message).toBe(PRESETS.default)
      })

      it('should return a "level:range" preset', () => {
        const expected = [0, 1, '[one, two, three]']
        const received = ['string', 'invalid']
        const testError = new LogError({type:'level:range', expected, received})
        expect(testError.type).toBe('level:range')
        expect(testError.message).toBe(
          printf(PRESETS['level:range'], ...expected, ...received)
        )
      })

      it('should return a "level:type" preset', () => {
        const type = 'test'
        const testError = new LogError('level:type', type)
        expect(testError.type).toBe('level:type')
        expect(testError.message).toBe(
          printf(PRESETS['level:type'], type)
        )
      })

      it('should return a "message:empty" preset', () => {
        const testError = new LogError('message:empty')
        expect(testError.type).toBe('message:empty')
        expect(testError.message).toBe(PRESETS['message:empty'])
      })

      it('should return a "message:type" preset', () => {
        const testError = new LogError('message:type')
        expect(testError.type).toBe('message:type')
        expect(testError.message).toBe(PRESETS['message:type'])
      })
    })
  })
})
