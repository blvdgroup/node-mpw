import { hashSync } from 'scrypt'

import * as constants from './utils/constants'
import { generateSeed, toNetworkByte, computeTemplate } from './utils/helpers'
import { templates, templateChars } from './utils/templates'

export const generateKey = (name: string, password: string, version: number = constants.MP_ALGORITHM_VERSION,
  namespace?: string): Buffer => {
  if (typeof namespace === 'undefined') {
    namespace = constants.NAMESPACE
  }

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

  return hashSync(password, constants.SCRYPT_PARAMS, 64, buf)
}

export const generatePassword = (site: string, key: Buffer, counter: number = 1, template: string = 'long',
  version: number = constants.MP_ALGORITHM_VERSION, namespace?: string): string => {
  if (typeof namespace === 'undefined') {
    namespace = constants.NAMESPACE
  }

  let seed: Buffer | Uint16Array

  // V0 backwards compatibility: convert  generated seed to network byte order.
  if (version < 1) {
    seed = toNetworkByte(generateSeed(site, key, counter, version, namespace))
  } else {
    seed = generateSeed(site, key, counter, version, namespace)
  }

  return computeTemplate(templates, templateChars, template, seed)
}
