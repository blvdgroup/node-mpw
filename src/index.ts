import scrypt = require('scrypt')
import crypto = require('crypto')

import * as constants from './utils/constants'
// import * as templates from './utils/templates'
// import * as templateChars from './utils/templateChars'
import { toArrayBuffer } from './utils/helpers'

export const generateKey = (name: string, password: string, namespace?: string, version?: string): Buffer => {
  if (!namespace) {
    namespace = constants.NAMESPACE
  }

  // Salt for the scrypt function: `namespace + name.length + name`
  const buf = Buffer.allocUnsafe(namespace.length + 4 + name.length)
  buf.fill(0)

  buf.write(namespace)
  buf.writeUInt32BE(name.length, namespace.length)
  buf.write(name, namespace.length + 4)

  return scrypt.hashSync(password, { N: 32768, r: 8, p: 2 }, 64, buf)
}

export const generateSeed = (site: string, key: Buffer, counter: number = 1, namespace?: string) => {
  if (!namespace) {
    namespace = constants.NAMESPACE
  }

  // Buffer array that serves as a data to generate the seed via HMAC-SHA256:
  // `namespace + site.length + site + counter`
  const buf = Buffer.allocUnsafe(namespace.length + 4 + site.length + 4)
  buf.fill(0)

  buf.write(namespace)
  buf.writeUInt32BE(site.length, namespace.length)
  buf.write(site, namespace.length + 4)
  buf.writeUInt32BE(counter, namespace.length + 4 + site.length)

  return crypto.createHmac('sha256', key).update(buf).digest()
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
