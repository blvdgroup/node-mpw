/* eslint-env node, mocha */

const chai = require('chai')
const mpw = require('../dist')

const assert = chai.assert

describe('mpw', () => {
  // Testing parameters
  const username = 'username'
  const password = 'password'
  const site = 'example.com'

  describe('#generateKey()', () => {
    it('should return a Buffer', () => {
      const key = mpw.generateKey(username, password)
      assert.ok(key instanceof Buffer, 'generated key is a Buffer')
    })
  })

  describe('#generatePassword()', () => {
    const tests = [
      {
        args: { counter: 1, template: 'maximum', version: 3 },
        expected: 'v8]RfHIhBg1XE1!692*O'
      },
      {
        args: { counter: 1, template: 'long', version: 3 },
        expected: 'Fogu4!ZindLoni'
      },
      {
        args: { counter: 1, template: 'medium', version: 3 },
        expected: 'Fog9-Qeb'
      },
      {
        args: { counter: 1, template: 'basic', version: 3 },
        expected: 'vVv9fOp2'
      },
      {
        args: { counter: 1, template: 'short', version: 3 },
        expected: 'Fog9'
      },
      {
        args: { counter: 1, template: 'pin', version: 3 },
        expected: '5819'
      },
      {
        args: { counter: 1, template: 'maximum', version: 2 },
        expected: 'v8]RfHIhBg1XE1!692*O'
      },
      {
        args: { counter: 1, template: 'long', version: 2 },
        expected: 'Fogu4!ZindLoni'
      },
      {
        args: { counter: 1, template: 'medium', version: 2 },
        expected: 'Fog9-Qeb'
      },
      {
        args: { counter: 1, template: 'basic', version: 2 },
        expected: 'vVv9fOp2'
      },
      {
        args: { counter: 1, template: 'short', version: 2 },
        expected: 'Fog9'
      },
      {
        args: { counter: 1, template: 'pin', version: 2 },
        expected: '5819'
      },
      {
        args: { counter: 1, template: 'maximum', version: 1 },
        expected: 'v8]RfHIhBg1XE1!692*O'
      },
      {
        args: { counter: 1, template: 'long', version: 1 },
        expected: 'Fogu4!ZindLoni'
      },
      {
        args: { counter: 1, template: 'medium', version: 1 },
        expected: 'Fog9-Qeb'
      },
      {
        args: { counter: 1, template: 'basic', version: 1 },
        expected: 'vVv9fOp2'
      },
      {
        args: { counter: 1, template: 'short', version: 1 },
        expected: 'Fog9'
      },
      {
        args: { counter: 1, template: 'pin', version: 1 },
        expected: '5819'
      },
      {
        args: { counter: 1, template: 'maximum', version: 0 },
        expected: 'HSbR#@vlmc)mm))3#A3!'
      },
      {
        args: { counter: 1, template: 'long', version: 0 },
        expected: 'Toyu4!ZiylSoyi'
      },
      {
        args: { counter: 1, template: 'medium', version: 0 },
        expected: 'ToySum1!'
      },
      {
        args: { counter: 1, template: 'basic', version: 0 },
        expected: 'HAH9Ngg7'
      },
      {
        args: { counter: 1, template: 'short', version: 0 },
        expected: 'Toy9'
      },
      {
        args: { counter: 1, template: 'pin', version: 0 },
        expected: '5819'
      }
    ]

    it('should return a string', () => {
      const key = mpw.generateKey(username, password)
      const generated = mpw.generatePassword(site, key)
      assert.typeOf(generated, 'string', 'generated password is a string')
    })

    tests.forEach((test) => {
      it(`generates the correct \`${test.args.template}\` template password (V${test.args.version})`, () => {
        const key = mpw.generateKey(username, password, test.args.version)
        const generated = mpw.generatePassword(site, key, test.args.counter, test.args.template, test.args.version)
        assert.equal(generated, test.expected)
      })
    })
  })
})
