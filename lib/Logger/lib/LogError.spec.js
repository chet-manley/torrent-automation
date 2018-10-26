'use strict'

const LogError = require('./LogError')
const error = new LogError('test-type', 'test-message')
const NAME = error.name

describe(`${NAME} Class`, () => {
  it('should extend Error class', () => {
    expect(Error.prototype.isPrototypeOf(LogError.prototype)).toBe(true)
  })

  describe(`${NAME} instance`, () => {
    it(`should return a new ${NAME} object`, () => {
      expect(Object.getPrototypeOf(error) === LogError.prototype).toBe(true)
      expect(error instanceof LogError).toBe(true)
    })

    it(`should return a new ${NAME} with a custom "name" property`, () => {
      expect(error.name).toBe(`${NAME}`)
    })

    it(`should return a new ${NAME} with a custom "type" property`, () => {
      expect(error.type).toBe('test-type')
    })

    it(`should return a new ${NAME} with a proper stack`, () => {
      expect(error.stack).toBeDefined()
      expect(error.stack).toEqual(expect.stringContaining(`${NAME}`))
    })

    it(`should throw a ${NAME} error`, () => {
      expect(() => {throw error}).toThrow(LogError)
    })

    it('should throw an error with a defined message', () => {
      expect(() => {throw error}).toThrow('test-message')
    })
  })
})
