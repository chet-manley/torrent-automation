'use strict'

/** Class to validate inputs. */
class Validate {
  constructor () {}

  /**
   * Validate input is a String.
   * @param {*} value - Test case.
   * @returns {Boolean} true|false
   */
  static string (value) {
    return typeof value === 'string' || value instanceof String
  }
  string (v) {return Validate.string(v)}

  /**
   * Validate input is an empty String.
   * @param {*} value - Test case.
   * @returns {Boolean} true|false
   */
  static emptyString (value) {
    return this.string(value) && value.length === 0
  }
  emptyString (v) {return Validate.emptyString(v)}

  /**
   * Validate input is a Number.
   * @param {*} value - Test case.
   * @returns {Boolean} true|false
   */
  static number (value) {
    return typeof value === 'number' || value instanceof Number
  }
  number (v) {return Validate.number(v)}

  /**
   * Validate input is a real number or String containing a real number.
   * @param {*} value - Test case.
   * @returns {Boolean} true|false
   */
  static realNumber (value) {
    return (this.number(value) || (this.string(value) && value.length !== 0)) && Number.isFinite(Number(value))
  }
  realNumber (v) {return Validate.realNumber(v)}

  /**
   * Validate input is an Integer or String containing an Integer.
   * @param {*} value - Test case.
   * @returns {Boolean} true|false
   */
  static integer (value) {
    return this.realNumber(value) && Number.isInteger(Number(value))
  }
  integer (v) {return Validate.integer(v)}

  /**
   * Create a new error message when validation fails.
   * @param {String} message    - The error message
   * @param {String} [expected] - The expected outcome
   * @param {String} [actual]   - The actual outcome
   * @returns {Error} new Error instance
   */
  failed (message, expected, actual) {
    let error = message
    if (expected.length) {error += ` Expected ${expected}.`}
    if (actual.length) {error += ` Received ${actual}.`}
    return new Error(error)
  }
}

module.exports = Validate
