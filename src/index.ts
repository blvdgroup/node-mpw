import scrypt = require('scrypt')

import * as constants from './utils/constants'
import { generateSeed } from './utils/helpers'
import { templates, templateChars } from './utils/templates'

export const generateKey = (name: string, password: string, version?: number, namespace?: string): Buffer => {
  if (!namespace) {
    namespace = constants.NAMESPACE
  }
  if (!version) {
    version = constants.MP_ALGORITHM_VERSION
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

  return scrypt.hashSync(password, constants.SCRYPT_PARAMS, 64, buf)
}

export const generatePassword = (site: string, key: Buffer, counter: number = 1,
  template: string = 'long', version?: number, namespace?: string): string => {
  if (!namespace) {
    namespace = constants.NAMESPACE
  }

  // Calculate the seed
  let seed = generateSeed(site, key, counter, version, namespace)

  // Find the selected template array and select a specific template based
  // on `seed[0]`
  let selectedTemplate: string[] = templates[template]
  let templateCompute: string = selectedTemplate[seed[0] % selectedTemplate.length]

  return templateCompute.split('').map((c, i) => {
    let chars: string = templateChars[c]

    // Select the character using `seed[i + 1]`
    return chars[seed[i + 1] % chars.length]
  }).join('')
}
