// Type definitions for node-mpw
// Project: https://github.com/blvdgroup/node-mpw
// Definitions by: Resi Respati <https://resir014.github.io/>

declare namespace mpw {
  /**
   * Calculate the master key from a user's name and master password.
   *
   * @export
   * @param {string} name The username.
   * @param {string} password The password.
   * @param {string} [version] The algorithm version being used for this process.
   * @param {string} [namespace] The namespace used as a salt to calculate the key.
   * @returns {Buffer} An key generated from the `scrypt` algorithm.
   */
  export function generateKey(name: string, password: string, version?: string, namespace?: string): Buffer
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
  export function generatePassword(
    site: string,
    key: Buffer,
    counter?: number,
    template?: string,
    version?: number,
    namespace?: string
  ): string
}
