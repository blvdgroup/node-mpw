var chai = require('chai')
var assert = chai.assert

var mpw = require('../dist')

// Testing parameters
var testUsername = 'username'
var testPassword = 'password'
var testSite = 'example.com'

// Generate our key based on the testing parameters
var testKey = mpw.generateKey(testUsername, testPassword)

describe('mpw', function () {
  describe('#generatePassword()', function () {
    it('generates the correct `maximum` template password (V3)', function () {
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'maximum'), 'v8]RfHIhBg1XE1!692*O')
    })
    it('generates the correct `long` template password (V3)', function () {
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'long'), 'Fogu4!ZindLoni')
    })
    it('generates the correct `medium` template password (V3)', function () {
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'medium'), 'Fog9-Qeb')
    })
    it('generates the correct `basic` template password (V3)', function () {
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'basic'), 'vVv9fOp2')
    })
    it('generates the correct `short` template password (V3)', function () {
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'short'), 'Fog9')
    })
    it('generates the correct `pin` template password (V3)', function () {
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'pin'), '5819')
    })
    it('generates the correct `maximum` template password (V2)', function () {
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'maximum'), 'v8]RfHIhBg1XE1!692*O')
    })
    it('generates the correct `long` template password (V2)', function () {
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'long'), 'Fogu4!ZindLoni')
    })
    it('generates the correct `medium` template password (V2)', function () {
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'medium'), 'Fog9-Qeb')
    })
    it('generates the correct `basic` template password (V2)', function () {
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'basic'), 'vVv9fOp2')
    })
    it('generates the correct `short` template password (V2)', function () {
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'short'), 'Fog9')
    })
    it('generates the correct `pin` template password (V2)', function () {
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'pin'), '5819')
    })
  })
})
