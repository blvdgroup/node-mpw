import crypto = require('crypto')
import * as constants from './constants'

export const generateSeed = (site: string, key: Buffer, counter: number = 1, namespace?: string): Buffer => {
  if (!namespace) {
    namespace = constants.NAMESPACE
  }

  // Buffer that serves as a data to generate the seed via HMAC-SHA256:
  // `namespace + site.length + site + counter`
  const buf = Buffer.allocUnsafe(namespace.length + 4 + site.length + 4)
  buf.fill(0)

  buf.write(namespace)
  buf.writeUInt32BE(site.length, namespace.length)
  buf.write(site, namespace.length + 4)
  buf.writeUInt32BE(counter, namespace.length + 4 + site.length)

  return crypto.createHmac('sha256', key).update(buf).digest()
}
