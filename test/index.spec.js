var chai = require('chai')
var assert = chai.assert

var mpw = require('../dist')

var testUsername = 'username'
var testPassword = 'password'
var testSite = 'example.com'

describe('mpw', function () {
  describe('#generatePassword()', function () {
    it('generates the correct `maximum` template password (V3)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword)
      var testSeed = mpw.generateSeed(testSite, testKey)

      var gen = mpw.generatePassword(testSite, testKey, testSeed, 1, 'maximum')
      assert.equal(gen, 'v8]RfHIhBg1XE1!692*O')
    })
    it('generates the correct `long` template password (V3)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword)
      var testSeed = mpw.generateSeed(testSite, testKey)

      var gen = mpw.generatePassword(testSite, testKey, testSeed, 1, 'long')
      assert.equal(gen, 'Fogu4!ZindLoni')
    })
    it('generates the correct `medium` template password (V3)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword)
      var testSeed = mpw.generateSeed(testSite, testKey)

      var gen = mpw.generatePassword(testSite, testKey, testSeed, 1, 'medium')
      assert.equal(gen, 'Fog9-Qeb')
    })
    it('generates the correct `short` template password (V3)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword)
      var testSeed = mpw.generateSeed(testSite, testKey)

      var gen = mpw.generatePassword(testSite, testKey, testSeed, 1, 'short')
      assert.equal(gen, 'Fog9')
    })
    it('generates the correct `basic` template password (V3)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword)
      var testSeed = mpw.generateSeed(testSite, testKey)

      var gen = mpw.generatePassword(testSite, testKey, testSeed, 1, 'basic')
      assert.equal(gen, 'vVv9fOp2')
    })
    it('generates the correct `pin` template password (V3)', function () {
      var testKey = mpw.generateKey(testUsername, testPassword)
      var testSeed = mpw.generateSeed(testSite, testKey)

      var gen = mpw.generatePassword(testSite, testKey, testSeed, 1, 'pin')
      assert.equal(gen, '5819')
    })
  })
})
