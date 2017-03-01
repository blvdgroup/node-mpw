import * as crypto from 'crypto'
import * as constants from './constants'

/**
 * Calculate the template seed from the site's name and counter.
 *
 * @export
 * @param {string} site The site name. The bare domain name is an ideal choice.
 * @param {Buffer} key An `scrypt`-hashed key generated from the `generateKey()` function.
 * @param {number} [counter] An integer that can be incremented when the user needs a new password for the site.
 * @param {number} [version] The algorithm version being used for this process.
 * @param {string} [namespace] The namespace used as a salt to calculate the seed.
 * @returns {Buffer} The template seed.
 */
export const generateSeed = (
  site: string,
  key: Buffer,
  counter: number = 1,
  version: number = constants.MP_ALGORITHM_VERSION,
  namespace: string = constants.NAMESPACE
): Buffer => {
  // Cache site length for older versions of MPW.
  // https://github.com/tmthrgd/mpw-js/blob/master/mpw.js#L36-L38
  let siteLength = site.length

  // Buffer that serves as a data to generate the seed via HMAC-SHA256:
  // `namespace + site.length + site + counter`
  const buf = Buffer.allocUnsafe(namespace.length + 4 + site.length + 4).fill(0)

  buf.write(namespace)

  // V1 backwards compatibility: use the cached siteLength for older versions.
  if (version < 2) {
    buf.writeUInt32BE(siteLength, namespace.length)
  } else {
    buf.writeUInt32BE(site.length, namespace.length)
  }

  buf.write(site, namespace.length + 4)
  buf.writeUInt32BE(counter, namespace.length + 4 + site.length)

  return crypto.createHmac('sha256', key).update(buf).digest()
}

/**
 * Converts a Buffer into network byte order.
 *
 * @export
 * @param {Buffer} buffer The buffer to be converted into network byte order.
 * @returns {Uint16Array} A Uint16Array of the buffer in network byte order.
 */
export const toNetworkByte = (buffer: Buffer): Uint16Array => {
  let uint = new Uint16Array(buffer.length)

  // Convert seed to network byte order.
  // https://github.com/tmthrgd/mpw-js/blob/master/mpw.js#L208-L224
  for (let i = 0; i < uint.length; i++) {
    // tslint:disable-next-line
    uint[i] = (buffer[i] > 127 ? 0x00ff : 0x0000) | (buffer[i] << 8)
  }

  return uint
}

/**
 * Determines the template to use based on the template seed, and computes the final password.
 *
 * @export
 * @param {Object} templates An Object containing a list of the available templates.
 * @param {Object} templateChars An Object containing a list of password characters.
 * @param {string} template The desired template.
 * @param {(Buffer | Uint16Array)} seed The template seed generated from the `generateSeed()` function.
 * @returns {string} The final password string computed from the template.
 */
export const computeTemplate = (
  templates: Object,
  templateChars: Object,
  template: string,
  seed: Buffer | Uint16Array
): string => {
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
