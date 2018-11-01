/* eslint-disable no-new-wrappers, no-magic-numbers */
'use strict'
const {is} = require('./Validate')
const NAME = 'Validate'

describe('Validate Factory module', () => {
  it('should contain an "is" object with a "name" property', () => {
    expect(is.name).toBe(NAME)
  })

  describe('string method', () => {
    it('should return false on a Number', () => {
      expect(is.string(1)).toBe(false)
      expect(is.string(Number())).toBe(false)
      expect(is.string(new Number)).toBe(false)
    })

    it('should return false on an Array', () => {
      expect(is.string([])).toBe(false)
      expect(is.string(Array())).toBe(false)
      expect(is.string(new Array)).toBe(false)
    })

    it('should return false on an Object', () => {
      expect(is.string({})).toBe(false)
      expect(is.string(Object())).toBe(false)
      expect(is.string(new Object)).toBe(false)
    })

    it('should return true on a String literal', () => {
      expect(is.string('string')).toBe(true)
      expect(is.string(String())).toBe(true)
      expect(is.string(String('string'))).toBe(true)
    })

    it('should return true on a String object', () => {
      expect(is.string(new String)).toBe(true)
      expect(is.string(new String('string'))).toBe(true)
    })

    describe('edge cases', () => {
      it('should return false on Infinity or NaN', () => {
        expect(is.string(Infinity)).toBe(false)
        expect(is.string(NaN)).toBe(false)
      })

      it('should return false on undefined or null', () => {
        expect(is.string(undefined)).toBe(false)
        expect(is.string(null)).toBe(false)
      })
    })
  })

  describe('emptyString method', () => {
    it('should return false on a Number', () => {
      expect(is.emptyString(0)).toBe(false)
      expect(is.emptyString(Number())).toBe(false)
      expect(is.emptyString(new Number)).toBe(false)
    })

    it('should return false on an Array', () => {
      expect(is.emptyString([])).toBe(false)
      expect(is.emptyString(Array())).toBe(false)
      expect(is.emptyString(new Array)).toBe(false)
    })

    it('should return false on an Object', () => {
      expect(is.emptyString({})).toBe(false)
      expect(is.emptyString(Object())).toBe(false)
      expect(is.emptyString(new Object)).toBe(false)
    })

    it('should return true on an empty String literal', () => {
      expect(is.emptyString('')).toBe(true)
      expect(is.emptyString(String())).toBe(true)
    })

    it('should return true on an empty String object', () => {
      expect(is.emptyString(new String)).toBe(true)
      expect(is.emptyString(new String())).toBe(true)
    })
  })

  describe('toString method', () => {
    it('should return true on a String', () => {
      expect(is.toString('')).toBe(true)
      expect(is.toString('foo')).toBe(true)
      expect(is.toString(String())).toBe(true)
      expect(is.toString(new String)).toBe(true)
      expect(is.toString(new String())).toBe(true)
      expect(is.toString(new String(''))).toBe(true)
      expect(is.toString(new String('foo'))).toBe(true)
    })

    it('should return true on a Number', () => {
      expect(is.toString(0)).toBe(true)
      expect(is.toString(Number())).toBe(true)
      expect(is.toString(Number(1))).toBe(true)
      expect(is.toString(new Number)).toBe(true)
      expect(is.toString(new Number())).toBe(true)
      expect(is.toString(new Number(1))).toBe(true)
      expect(is.toString(NaN)).toBe(true)
      expect(is.toString(Infinity)).toBe(true)
      expect(is.toString(-Infinity)).toBe(true)
    })

    it('should return true on an Array', () => {
      expect(is.toString([])).toBe(true)
      expect(is.toString([''])).toBe(true)
      expect(is.toString([1,2])).toBe(true)
      expect(is.toString(Array())).toBe(true)
      expect(is.toString(Array([]))).toBe(true)
      expect(is.toString(Array(1,2))).toBe(true)
      expect(is.toString(new Array)).toBe(true)
      expect(is.toString(new Array())).toBe(true)
      expect(is.toString(new Array(1,2))).toBe(true)
    })

    it('should return true on any Object with valid "toString" method', () => {
      expect(is.toString({toString: ()=>'foo'})).toBe(true)
      expect(is.toString(new Error)).toBe(true)
    })

    it('should return true on Functions with valid "toString" method', () => {
      expect(is.toString(function () {return false})).toBe(true)
      expect(is.toString(() => false)).toBe(true)
      expect(is.toString(Object)).toBe(true)
      expect(is.toString(Symbol)).toBe(true)
    })

    it('should return true on Symbols', () => {
      expect(is.toString(Symbol())).toBe(true)
      expect(is.toString(Symbol(''))).toBe(true)
      expect(is.toString(Symbol(null))).toBe(true)
    })

    it('should return true on Booleans', () => {
      expect(is.toString(true)).toBe(true)
      expect(is.toString(false)).toBe(true)
      expect(is.toString(Boolean())).toBe(true)
      expect(is.toString(Boolean(0))).toBe(true)
      expect(is.toString(Boolean('foo'))).toBe(true)
      expect(is.toString(new Boolean)).toBe(true)
      expect(is.toString(new Boolean(0))).toBe(true)
      expect(is.toString(new Boolean('foo'))).toBe(true)
    })

    it('should return true on anything that can be coerced to a String', () => {
      expect(is.toString(undefined)).toBe(true)
      expect(is.toString(null)).toBe(true)
    })

    it('should return false on anything with invalid "toString" method', () => {
      expect(is.toString({})).toBe(false)
      expect(is.toString(Object())).toBe(false)
      expect(is.toString(new Object)).toBe(false)
    })
  })

  describe('number method', () => {
    it('should return false on a String', () => {
      expect(is.number('1')).toBe(false)
      expect(is.number(String('0'))).toBe(false)
      expect(is.number(new String)).toBe(false)
    })

    it('should return false on an Array', () => {
      expect(is.number([])).toBe(false)
      expect(is.number(Array())).toBe(false)
      expect(is.number(new Array)).toBe(false)
    })

    it('should return false on an Object', () => {
      expect(is.number({})).toBe(false)
      expect(is.number(Object())).toBe(false)
      expect(is.number(new Object)).toBe(false)
    })

    it('should return true on a Number literal', () => {
      expect(is.number(0)).toBe(true)
      expect(is.number(-1)).toBe(true)
      expect(is.number(10e10)).toBe(true)
      expect(is.number(Number())).toBe(true)
      expect(is.number(Number(-0))).toBe(true)
    })

    it('should return true on a Number object', () => {
      expect(is.number(new Number)).toBe(true)
      expect(is.number(new Number(-0))).toBe(true)
    })
  })

  describe('realNumber method', () => {
    it('should return false on a String not containing a number', () => {
      expect(is.realNumber('string')).toBe(false)
      expect(is.realNumber(String('string'))).toBe(false)
      expect(is.realNumber(new String)).toBe(false)
    })

    it('should return false on an Array', () => {
      expect(is.realNumber([])).toBe(false)
      expect(is.realNumber(Array())).toBe(false)
      expect(is.realNumber(new Array)).toBe(false)
    })

    it('should return false on an Object', () => {
      expect(is.realNumber({})).toBe(false)
      expect(is.realNumber(Object())).toBe(false)
      expect(is.realNumber(new Object)).toBe(false)
    })

    it('should return true on a Number literal', () => {
      expect(is.realNumber(0)).toBe(true)
      expect(is.realNumber(-0)).toBe(true)
      expect(is.realNumber(10e10)).toBe(true)
      expect(is.realNumber(Number(-1.2))).toBe(true)
    })

    it('should return true on a Number object', () => {
      expect(is.realNumber(new Number)).toBe(true)
      expect(is.realNumber(new Number(-0))).toBe(true)
    })

    it('should return true on a String containing a number', () => {
      expect(is.realNumber('0')).toBe(true)
      expect(is.realNumber(String('-0'))).toBe(true)
      expect(is.realNumber(new String(10e10))).toBe(true)
      expect(is.realNumber(new String('-1.2'))).toBe(true)
    })
  })

  describe('integer method', () => {
    it('should return false on a String not containing an Integer', () => {
      expect(is.integer('string')).toBe(false)
      expect(is.integer(String('string'))).toBe(false)
      expect(is.integer(new String)).toBe(false)
    })

    it('should return false on an Array', () => {
      expect(is.integer([])).toBe(false)
      expect(is.integer(Array())).toBe(false)
      expect(is.integer(new Array)).toBe(false)
    })

    it('should return false on an Object', () => {
      expect(is.integer({})).toBe(false)
      expect(is.integer(Object())).toBe(false)
      expect(is.integer(new Object)).toBe(false)
    })

    it('should return true on an Integer Number literal', () => {
      expect(is.integer(0)).toBe(true)
      expect(is.integer(-0)).toBe(true)
      expect(is.integer(10e10)).toBe(true)
      expect(is.integer(Number(-1))).toBe(true)
    })

    it('should return true on an Integer Number object', () => {
      expect(is.integer(new Number)).toBe(true)
      expect(is.integer(new Number(-0))).toBe(true)
    })

    it('should return true on an Integer as a String', () => {
      expect(is.integer('0')).toBe(true)
      expect(is.integer(String('-0'))).toBe(true)
      expect(is.integer(new String(10e10))).toBe(true)
      expect(is.integer(new String('-1'))).toBe(true)
    })

    it('should return false on a Floating Point as Number or String', () => {
      expect(is.integer(1.1)).toBe(false)
      expect(is.integer('1.1')).toBe(false)
      expect(is.integer(-1.1)).toBe(false)
      expect(is.integer('-1.1')).toBe(false)
    })
  })
})
