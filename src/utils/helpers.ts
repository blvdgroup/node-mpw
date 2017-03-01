import crypto = require('crypto')
import { htons } from 'network-byte-order'
import * as constants from './constants'

export const generateSeed = (site: string, key: Buffer, counter: number = 1,
  version?: number, namespace?: string): Buffer => {
  if (!namespace) {
    namespace = constants.NAMESPACE
  }
  if (!version) {
    version = constants.MP_ALGORITHM_VERSION
  }

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

export const toNetworkByte = (buffer: Buffer | Uint16Array): Uint16Array => {
  let uint = new Uint16Array(buffer.length)

  // Convert seed to network byte order.
  // https://github.com/tmthrgd/mpw-js/blob/master/mpw.js#L208-L224
  for (let i = 0; i < uint.length; i++) {
    // tslint:disable-next-line
    uint[i] = (buffer[i] > 127 ? 0x00ff : 0x0000) | (buffer[i] << 8)
  }

  return uint
}
