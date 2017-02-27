import scrypt = require('scrypt')

import * as constants from './utils/constants'
import { generateSeed } from './utils/helpers'
import { templates, templateChars } from './utils/templates'

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

  return scrypt.hashSync(password, constants.SCRYPT_PARAMS, 64, buf)
}

export const generatePassword = (site: string, key: Buffer, counter: number = 1,
  template: string = 'long', namespace?: string): string => {
  if (!namespace) {
    namespace = constants.NAMESPACE
  }

  // Calculate the seed
  let seed = generateSeed(site, key, counter, namespace)

  // Find the selected template array and select a specific template based
  // on `seed[0]`
  let selectedTemplate: string[] = templates[template]
  let templateCompute: string = selectedTemplate[seed[0] % selectedTemplate.length]

  return templateCompute.split('').map((c, i) => {
    let chars: string = templateChars[c]

    return chars[seed[i + 1] % chars.length]
  }).join('')
}
