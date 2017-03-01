import * as scrypt from 'scrypt'

import * as constants from './utils/constants'
import { generateSeed, toNetworkByte, computeTemplate } from './utils/helpers'
import { templates, templateChars } from './utils/templates'

/**
 * Calculate the master key from a user's name and master password.
 *
 * @export
 * @param {string} name The desired username.
 * @param {string} password The desired master password.
 * @param {string} [version] The algorithm version being used for this process.
 * @param {string} [namespace] The namespace used as a salt to calculate the key.
 * @returns {Buffer} a key generated from the `scrypt` algorithm.
 */
export const generateKey = (
  name: string,
  password: string,
  version: number = constants.MP_ALGORITHM_VERSION,
  namespace: string = constants.NAMESPACE
): Buffer => {
  // Cache name length for older versions of MPW.
  // https://github.com/tmthrgd/mpw-js/blob/master/mpw.js#L36-L38
  let nameLength = name.length

  // Salt for the scrypt function: `namespace + name.length + name`
  const buf = Buffer.allocUnsafe(namespace.length + 4 + name.length).fill(0)

  buf.write(namespace)

  // V2 backwards compatibility: use the cached nameLength for older versions.
  if (version < 3) {
    buf.writeUInt32BE(nameLength, namespace.length)
  } else {
    buf.writeUInt32BE(name.length, namespace.length)
  }

  buf.write(name, namespace.length + 4)

  return scrypt.hashSync(password, constants.SCRYPT_PARAMS, 64, buf)
}

/**
 * Encode a site password using the site's type template.
 *
 * @export
 * @param {string} site The site name. The bare domain name is an ideal choice.
 * @param {Buffer} key An `scrypt`-hashed key generated from the `generateKey()` function.
 * @param {number} [counter] An integer that can be incremented when the user needs a new password for the site.
 * @param {string} [template] The password template that the user chooses.
 * @param {number} [version] The algorithm version being used for this process.
 * @param {string} [namespace] The namespace used as a salt to calculate the seed.
 * @returns {string} the final, generated password.
 */
export const generatePassword = (
  site: string,
  key: Buffer,
  counter: number = 1,
  template: string = 'long',
  version: number = constants.MP_ALGORITHM_VERSION,
  namespace: string = constants.NAMESPACE
): string => {
  // Keep a reference of the `seed` variable.
  let seed: Buffer | Uint16Array

  // V0 backwards compatibility: convert generated seed to network byte order.
  if (version < 1) {
    seed = toNetworkByte(generateSeed(site, key, counter, version, namespace))
  } else {
    seed = generateSeed(site, key, counter, version, namespace)
  }

  return computeTemplate(templates, templateChars, template, seed)
}
