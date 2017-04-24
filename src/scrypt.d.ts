// Type definitions for scrypt
// Project: https://github.com/barrysteyn/node-scrypt
// Definitions by: Resi Respati <https://resir014.github.io/>

declare module 'scrypt' {
  /**
   * The internal parameters for the scrypt algorithm.
   *
   * @export
   * @interface ParamsObject
   * @extends {Object}
   */
  export interface ParamsObject extends Object {
    N: number
    r: number
    p: number
  }

  /**
   * Translates human understandable parameters to scrypt's internal parameters.
   *
   * @export
   * @param {number} maxtime a decimal (double) representing the maximum amount
   *    of time in seconds scrypt will spend when computing the derived key.
   * @param {number} [maxmem] an integer, specifying the maximum number of bytes
   *    of RAM used when computing the derived encryption key. If not present,
   *    will default to 0.
   * @param {number} [maxmemfrac] a double value between 0.0 and 1.0,
   *    representing the fraction (normalized percentage value) of the available
   *    RAM used when computing the derived key. If not present, will default to
   *    0.5.
   * @param {Function} [callback_function] not applicable to synchronous function.
   *    If present in async function, then it will be treated as a normal async
   *    callback. If not present, a Promise will be returned if ES6 promises are
   *    available. If not present and ES6 promises are not present, a
   *    SyntaxError will be thrown.
   * @returns {Promise<ParamsObject>}
   */
  export function params(
    maxtime: number,
    maxmem?: number,
    maxmemfrac?: number,
    callback_function?: Function
  ): Promise<ParamsObject>

  /**
   * Translates human understandable parameters to scrypt's internal parameters.
   *
   * @export
   * @param {number} maxtime a decimal (double) representing the maximum amount
   *    of time in seconds scrypt will spend when computing the derived key.
   * @param {number} [maxmem] an integer, specifying the maximum number of bytes
   *    of RAM used when computing the derived encryption key. If not present,
   *    will default to 0.
   * @param {number} [maxmemfrac] a double value between 0.0 and 1.0,
   *    representing the fraction (normalized percentage value) of the available
   *    RAM used when computing the derived key. If not present, will default to
   *    0.5.
   * @returns {ParamsObject}
   */
  export function paramsSync(maxtime: number, maxmem?: number, maxmemfrac?: number): ParamsObject

  /**
   * Produces a key derivation function that uses the scrypt hash function. This
   * should be used for hashing and checking passwords as it incorporates salt
   * as well as HMAC into its format. It is based on a design by Colin Percival,
   * the author of scrypt. The format can be seen here.
   *
   * @export
   * @param {(string | Buffer)} key a string (or buffer) representing the key
   *    (password) that is to be hashed.
   * @param {ParamsObject} paramsObject parameters to control scrypt hashing
   *    (see params above).
   * @param {Function} [callback_function] not applicable to synchronous
   *    function. If present in async function, then it will be treated as a
   *    normal async callback. If not present, a Promise will be returned if ES6
   *    promises are available. If not present and ES6 promises are not present,
   *    a SyntaxError will be thrown.
   * @returns {Promise<Buffer>}
   */
  export function kdf(key: string | Buffer, paramsObject: ParamsObject, callback_function?: Function): Promise<Buffer>

  /**
   * Produces a key derivation function that uses the scrypt hash function. This
   * should be used for hashing and checking passwords as it incorporates salt
   * as well as HMAC into its format. It is based on a design by Colin Percival,
   * the author of scrypt. The format can be seen here.
   *
   * @export
   * @param {(string | Buffer)} key a string (or buffer) representing the key
   *    (password) that is to be hashed.
   * @param {ParamsObject} paramsObject parameters to control scrypt hashing
   *    (see params above).
   * @returns {Promise<Buffer>}
   */
  export function kdfSync(key: string | Buffer, paramsObject: ParamsObject): Buffer

  /**
   * Checks if a key (password) matches a kdf.
   *
   * @export
   * @param {Buffer} kdf see kdf above.
   * @param {(string | Buffer)} key a string (or buffer) representing the key
   *    (password) that is to be checked.
   * @param {Function} [callback_function] not applicable to synchronous
   *    function. If present in async function, then it will be treated as a
   *    normal async callback. If not present, a Promise will be returned if ES6
   *    promises are available. If not present and ES6 promises are not present,
   *    a SyntaxError will be thrown.
   * @returns {Promise<Boolean>}
   */
  export function verifyKdf(kdf: Buffer, key: string | Buffer, callback_function?: Function): Promise<Boolean>

  /**
   * Checks if a key (password) matches a kdf.
   *
   * @export
   * @param {Buffer} kdf see kdf above.
   * @param {(string | Buffer)} key a string (or buffer) representing the key
   *    (password) that is to be checked.
   * @returns {Promise<Boolean>}
   */
  export function verifyKdfSync(kdf: Buffer, key: string | Buffer): Boolean

  /**
   * This is the raw scrypt hash function.
   *
   * @export
   * @param {(string | Buffer)} key a string (or buffer) representing the key
   *    (password) that is to be checked.
   * @param {ParamsObject} paramsObject parameters to control scrypt hashing
   *    (see params above).
   * @param {number} output_length the length of the resulting hashed output.
   * @param {(string | Buffer)} salt a string (or buffer) used for salt. The
   *    string (or buffer) can be empty.
   * @param {Function} [callback_function] not applicable to synchronous
   *    function. If present in async function, then it will be treated as a
   *    normal async callback. If not present, a Promise will be returned if ES6
   *    promises are available. If not present and ES6 promises are not present,
   *    a SyntaxError will be thrown.
   * @returns {Promise<Buffer>}
   */
  export function hash(
    key: string | Buffer,
    paramsObject: ParamsObject,
    output_length: number,
    salt: string | Buffer,
    callback_function?: Function
  ): Promise<Buffer>

  /**
   * This is the raw scrypt hash function.
   *
   * @export
   * @param {(string | Buffer)} key a string (or buffer) representing the key
   *    (password) that is to be checked.
   * @param {ParamsObject} paramsObject parameters to control scrypt hashing
   *    (see params above).
   * @param {number} output_length the length of the resulting hashed output.
   * @param {(string | Buffer)} salt a string (or buffer) used for salt. The
   *    string (or buffer) can be empty.
   * @returns {Promise<Buffer>}
   */
  export function hashSync(key: string | Buffer, paramsObject: ParamsObject, output_length: number, salt: string | Buffer): Buffer
}
