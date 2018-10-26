/* eslint-disable no-new-wrappers, no-magic-numbers */
'use strict'

const Validate = require('./Validate.class')
const is = new Validate
const name = 'Validate'

describe('Validate Class module', () => {
  it('should export a Class constructor', () => {
    expect(typeof Validate).toBe('function')
  })

  it('should have the correct name', () => {
    expect(Validate.name).toBe(name)
  })

  it('should create new Class instances', () => {
    expect(is).toBeInstanceOf(Validate)
    expect(is).not.toBe(new Validate)
  })

  describe('"string"', () => {
    it('should be a static method', () => {
      expect(typeof Validate.string).toBe('function')
    })

    it('should be a class instance method', () => {
      expect(typeof is.string).toBe('function')
    })

    it('should return a Boolean', () => {
      expect(Validate.string()).toBe(false)
      expect(Validate.string('')).toBe(true)
    })

    it('should return false when passed a Number', () => {
      expect(Validate.string(1)).toBe(false)
      expect(Validate.string(Number())).toBe(false)
      expect(Validate.string(new Number)).toBe(false)
    })

    it('should return false when passed an Array', () => {
      expect(Validate.string([])).toBe(false)
      expect(Validate.string(Array())).toBe(false)
      expect(Validate.string(new Array)).toBe(false)
    })

    it('should return false when passed an Object', () => {
      expect(Validate.string({})).toBe(false)
      expect(Validate.string(Object())).toBe(false)
      expect(Validate.string(new Object)).toBe(false)
    })

    it('should return true when passed a String literal', () => {
      expect(Validate.string('string')).toBe(true)
      expect(Validate.string(String())).toBe(true)
      expect(Validate.string(String('string'))).toBe(true)
    })

    it('should return true when passed a String object', () => {
      expect(Validate.string(new String)).toBe(true)
      expect(Validate.string(new String('string'))).toBe(true)
    })

    describe('edge cases', () => {
      it('should return false when passed Infinity or NaN', () => {
        expect(Validate.string(Infinity)).toBe(false)
        expect(Validate.string(NaN)).toBe(false)
      })

      it('should return false when passed undefined or null', () => {
        expect(Validate.string(undefined)).toBe(false)
        expect(Validate.string(null)).toBe(false)
      })
    })
  })

  describe('"emptyString"', () => {
    it('should be a static method', () => {
      expect(typeof Validate.emptyString).toBe('function')
    })

    it('should be a class instance method', () => {
      expect(typeof is.emptyString).toBe('function')
    })

    it('should return a Boolean', () => {
      expect(Validate.emptyString(' ')).toBe(false)
      expect(Validate.emptyString('')).toBe(true)
    })

    it('should return false when passed a Number', () => {
      expect(Validate.emptyString(0)).toBe(false)
      expect(Validate.emptyString(Number())).toBe(false)
      expect(Validate.emptyString(new Number)).toBe(false)
    })

    it('should return false when passed an Array', () => {
      expect(Validate.emptyString([])).toBe(false)
      expect(Validate.emptyString(Array())).toBe(false)
      expect(Validate.emptyString(new Array)).toBe(false)
    })

    it('should return false when passed an Object', () => {
      expect(Validate.emptyString({})).toBe(false)
      expect(Validate.emptyString(Object())).toBe(false)
      expect(Validate.emptyString(new Object)).toBe(false)
    })

    it('should return true when passed an empty String literal', () => {
      expect(Validate.emptyString('')).toBe(true)
      expect(Validate.emptyString(String())).toBe(true)
    })

    it('should return true when passed an empty String object', () => {
      expect(Validate.emptyString(new String)).toBe(true)
      expect(Validate.emptyString(new String())).toBe(true)
    })
  })

  describe('"number"', () => {
    it('should be a static method', () => {
      expect(typeof Validate.number).toBe('function')
    })

    it('should be a class instance method', () => {
      expect(typeof is.number).toBe('function')
    })

    it('should return a Boolean', () => {
      expect(Validate.number('')).toBe(false)
      expect(Validate.number(1)).toBe(true)
    })

    it('should return false when passed a String', () => {
      expect(Validate.number('1')).toBe(false)
      expect(Validate.number(String('0'))).toBe(false)
      expect(Validate.number(new String)).toBe(false)
    })

    it('should return false when passed an Array', () => {
      expect(Validate.number([])).toBe(false)
      expect(Validate.number(Array())).toBe(false)
      expect(Validate.number(new Array)).toBe(false)
    })

    it('should return false when passed an Object', () => {
      expect(Validate.number({})).toBe(false)
      expect(Validate.number(Object())).toBe(false)
      expect(Validate.number(new Object)).toBe(false)
    })

    it('should return true when passed a Number literal', () => {
      expect(Validate.number(0)).toBe(true)
      expect(Validate.number(-1)).toBe(true)
      expect(Validate.number(10e10)).toBe(true)
      expect(Validate.number(Number())).toBe(true)
      expect(Validate.number(Number(-0))).toBe(true)
    })

    it('should return true when passed a Number object', () => {
      expect(Validate.number(new Number)).toBe(true)
      expect(Validate.number(new Number(-0))).toBe(true)
    })
  })

  describe('"realNumber"', () => {
    it('should be a static method', () => {
      expect(typeof Validate.realNumber).toBe('function')
    })

    it('should be a class instance method', () => {
      expect(typeof is.realNumber).toBe('function')
    })

    it('should return a Boolean', () => {
      expect(Validate.realNumber('')).toBe(false)
      expect(Validate.realNumber(1)).toBe(true)
    })

    it('should return false when passed a String not containing a number', () => {
      expect(Validate.realNumber('string')).toBe(false)
      expect(Validate.realNumber(String('string'))).toBe(false)
      expect(Validate.realNumber(new String)).toBe(false)
    })

    it('should return false when passed an Array', () => {
      expect(Validate.realNumber([])).toBe(false)
      expect(Validate.realNumber(Array())).toBe(false)
      expect(Validate.realNumber(new Array)).toBe(false)
    })

    it('should return false when passed an Object', () => {
      expect(Validate.realNumber({})).toBe(false)
      expect(Validate.realNumber(Object())).toBe(false)
      expect(Validate.realNumber(new Object)).toBe(false)
    })

    it('should return true when passed a Number literal', () => {
      expect(Validate.realNumber(0)).toBe(true)
      expect(Validate.realNumber(-0)).toBe(true)
      expect(Validate.realNumber(10e10)).toBe(true)
      expect(Validate.realNumber(Number(-1.2))).toBe(true)
    })

    it('should return true when passed a Number object', () => {
      expect(Validate.realNumber(new Number)).toBe(true)
      expect(Validate.realNumber(new Number(-0))).toBe(true)
    })

    it('should return true when passed a String containing a number', () => {
      expect(Validate.realNumber('0')).toBe(true)
      expect(Validate.realNumber(String('-0'))).toBe(true)
      expect(Validate.realNumber(new String(10e10))).toBe(true)
      expect(Validate.realNumber(new String('-1.2'))).toBe(true)
    })
  })

  describe('"integer"', () => {
    it('should be a static method', () => {
      expect(typeof Validate.integer).toBe('function')
    })

    it('should be a class instance method', () => {
      expect(typeof is.integer).toBe('function')
    })

    it('should return a Boolean', () => {
      expect(Validate.integer(1.2)).toBe(false)
      expect(Validate.integer(1)).toBe(true)
    })

    it('should return false when passed a String not containing an Integer', () => {
      expect(Validate.integer('string')).toBe(false)
      expect(Validate.integer(String('string'))).toBe(false)
      expect(Validate.integer(new String)).toBe(false)
    })

    it('should return false when passed an Array', () => {
      expect(Validate.integer([])).toBe(false)
      expect(Validate.integer(Array())).toBe(false)
      expect(Validate.integer(new Array)).toBe(false)
    })

    it('should return false when passed an Object', () => {
      expect(Validate.integer({})).toBe(false)
      expect(Validate.integer(Object())).toBe(false)
      expect(Validate.integer(new Object)).toBe(false)
    })

    it('should return true when passed an Integer Number literal', () => {
      expect(Validate.integer(0)).toBe(true)
      expect(Validate.integer(-0)).toBe(true)
      expect(Validate.integer(10e10)).toBe(true)
      expect(Validate.integer(Number(-1))).toBe(true)
    })

    it('should return true when passed an Integer Number object', () => {
      expect(Validate.integer(new Number)).toBe(true)
      expect(Validate.integer(new Number(-0))).toBe(true)
    })

    it('should return true when passed a String containing an Integer', () => {
      expect(Validate.integer('0')).toBe(true)
      expect(Validate.integer(String('-0'))).toBe(true)
      expect(Validate.integer(new String(10e10))).toBe(true)
      expect(Validate.integer(new String('-1'))).toBe(true)
    })

    it('should return false when passed a Floating Point as Number or String', () => {
      expect(Validate.integer(1.1)).toBe(false)
      expect(Validate.integer('1.1')).toBe(false)
      expect(Validate.integer(-1.1)).toBe(false)
      expect(Validate.integer('-1.1')).toBe(false)
    })
  })
})
