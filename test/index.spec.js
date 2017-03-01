var chai = require('chai')
var assert = chai.assert

var mpw = require('../dist')

// Testing parameters
var testUsername = 'username'
var testPassword = 'password'
var testSite = 'example.com'

describe('mpw', function () {
  describe('#generatePassword()', function () {
    it('generates the correct `maximum` template password (V3)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 3)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'maximum', 3), 'v8]RfHIhBg1XE1!692*O')
    })
    it('generates the correct `long` template password (V3)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 3)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'long', 3), 'Fogu4!ZindLoni')
    })
    it('generates the correct `medium` template password (V3)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 3)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'medium', 3), 'Fog9-Qeb')
    })
    it('generates the correct `basic` template password (V3)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 3)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'basic', 3), 'vVv9fOp2')
    })
    it('generates the correct `short` template password (V3)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 3)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'short', 3), 'Fog9')
    })
    it('generates the correct `pin` template password (V3)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 3)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'pin', 3), '5819')
    })
    it('generates the correct `maximum` template password (V2)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 2)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'maximum', 2), 'v8]RfHIhBg1XE1!692*O')
    })
    it('generates the correct `long` template password (V2)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 2)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'long', 2), 'Fogu4!ZindLoni')
    })
    it('generates the correct `medium` template password (V2)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 2)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'medium', 2), 'Fog9-Qeb')
    })
    it('generates the correct `basic` template password (V2)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 2)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'basic', 2), 'vVv9fOp2')
    })
    it('generates the correct `short` template password (V2)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 2)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'short', 2), 'Fog9')
    })
    it('generates the correct `pin` template password (V2)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 2)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'pin', 2), '5819')
    })
    it('generates the correct `maximum` template password (V1)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 1)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'maximum', 1), 'v8]RfHIhBg1XE1!692*O')
    })
    it('generates the correct `long` template password (V1)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 1)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'long', 1), 'Fogu4!ZindLoni')
    })
    it('generates the correct `medium` template password (V1)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 1)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'medium', 1), 'Fog9-Qeb')
    })
    it('generates the correct `basic` template password (V1)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 1)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'basic', 1), 'vVv9fOp2')
    })
    it('generates the correct `short` template password (V1)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 1)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'short', 1), 'Fog9')
    })
    it('generates the correct `pin` template password (V1)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 1)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'pin', 1), '5819')
    })
    it('generates the correct `maximum` template password (V0)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 0)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'maximum', 0), 'HSbR#@vlmc)mm))3#A3!')
    })
    it('generates the correct `long` template password (V0)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 0)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'long', 0), 'Toyu4!ZiylSoyi')
    })
    it('generates the correct `medium` template password (V0)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 0)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'medium', 0), 'ToySum1!')
    })
    it('generates the correct `basic` template password (V0)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 0)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'basic', 0), 'HAH9Ngg7')
    })
    it('generates the correct `short` template password (V0)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 0)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'short', 0), 'Toy9')
    })
    it('generates the correct `pin` template password (V0)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword, 3)
      assert.equal(mpw.generatePassword(testSite, testKey, 1, 'pin', 0), '5819')
    })
  })
})
