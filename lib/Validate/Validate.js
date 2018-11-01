/** Module to validate inputs. */
'use strict'

const Validate = {
  name: 'Validate',

  /**
   * Validate input is a String.
   * @param {*} value - Test case.
   * @returns {Boolean} true|false
   */
  string (value) {
    return typeof value === 'string' || value instanceof String
  },

  /**
   * Validate input is an empty String.
   * @param {*} value - Test case.
   * @returns {Boolean} true|false
   */
  emptyString (value) {
    return this.string(value) && value.length === 0
  },

  /**
   * Validate input can be transformed to a String.
   * @param {*} value - Test case.
   * @returns {Boolean} true|false
   */
  toString (value) {
    return /^(?!\[object\s+[^\]]*\]+$).*/.test(String(value))
  },

  /**
   * Validate input is a Number.
   * @param {*} value - Test case.
   * @returns {Boolean} true|false
   */
  number (value) {
    return typeof value === 'number' || value instanceof Number
  },

  /**
   * Validate input is a real number or String containing a real number.
   * @param {*} value - Test case.
   * @returns {Boolean} true|false
   */
  realNumber (value) {
    return (this.number(value) || (this.string(value) && value.length !== 0))
      && Number.isFinite(Number(value))
  },

  /**
   * Validate input is an Integer or String containing an Integer.
   * @param {*} value - Test case.
   * @returns {Boolean} true|false
   */
  integer (value) {
    return this.realNumber(value) && Number.isInteger(Number(value))
  },
}

module.exports = Object.freeze({is: Validate})
