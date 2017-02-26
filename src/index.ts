import scrypt = require('scrypt')
import crypto = require('crypto')

import * as constants from './utils/constants'
// import * as templates from './utils/templates'
// import * as templateChars from './utils/templateChars'
import { toArrayBuffer } from './utils/helpers'

export const generateKey = (name: string, password: string, version?: string): Buffer => {
  // TODO: We should probably use buffers, since the algorithm specs wants
  // an unsigned 32-bit integer for numbers.
  // Probably improve the helper functions for this use-case.
  let salt = Buffer.from(constants.NAMESPACE + name.length + name, 'utf8')

  let key = scrypt.hashSync(password, { N: 32768, r: 8, p: 2 }, 64, salt)
  return key
}

export const generateSeed = (site: string, key: Buffer, counter: number = 1) => {
  // TODO: We should probably use buffers, since the algorithm specs wants
  // an unsigned 32-bit integer for numbers.
  // Probably improve the helper functions for this use-case.
  let data = Buffer.from(constants.NAMESPACE + site.length + site + counter)

  let seed = crypto.createHmac('sha256', key).update(data).digest()
  return Buffer.from(seed)
}

export const generatePassword = (site: string, key: Buffer, seed: Buffer, counter: number = 1,
  template = 'long') => {
  // TODO: Un-hardcode these. Figure out how to properly export from
  // `./utils/templates` and `./utils/templateChars`
  let selectedTemplate = [
    'CvcvnoCvcvCvcv',
    'CvcvCvcvnoCvcv',
    'CvcvCvcvCvcvno',
    'CvccnoCvcvCvcv',
    'CvccCvcvnoCvcv',
    'CvccCvcvCvcvno',
    'CvcvnoCvccCvcv',
    'CvcvCvccnoCvcv',
    'CvcvCvccCvcvno',
    'CvcvnoCvcvCvcc',
    'CvcvCvcvnoCvcc',
    'CvcvCvcvCvccno',
    'CvccnoCvccCvcv',
    'CvccCvccnoCvcv',
    'CvccCvccCvcvno',
    'CvcvnoCvccCvcc',
    'CvcvCvccnoCvcc',
    'CvcvCvccCvccno',
    'CvccnoCvcvCvcc',
    'CvccCvcvnoCvcc',
    'CvccCvcvCvccno'
  ]
  let templateChars = {
    V: 'AEIOU',
    C: 'BCDFGHJKLMNPQRSTVWXYZ',
    v: 'aeiou',
    c: 'bcdfghjklmnpqrstvwxyz',
    A: 'AEIOUBCDFGHJKLMNPQRSTVWXYZ',
    a: 'AEIOUaeiouBCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz',
    n: '0123456789',
    o: "@&%?,=[]_:-+*$#!'^~;()/.", // tslint:disable-line
    x: 'AEIOUaeiouBCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz0123456789!@#$%^&*()'
  }

  let templateCompute = selectedTemplate[seed[0] % selectedTemplate.length]

  return templateCompute.split('').map((c, i) => {
    let chars = templateChars[c]

    return chars[seed[i + 1] % chars.length]
  }).join('')
}
