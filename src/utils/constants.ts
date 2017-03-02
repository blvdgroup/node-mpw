/**
 * Interface used for passing `scrypt` parameters.
 *
 * @interface ScryptParameters
 */
interface ScryptParameters {
  N: number,
  r: number,
  p: number
}

/**
 * Current algorithm version.
 */
export const MP_ALGORITHM_VERSION: number = 3

/**
 * The namespace used when calculating keys
 */
export const NAMESPACE: string = 'com.lyndir.masterpassword'

/**
 * `scrypt` parameters used by the Master Password algorithm
 */
export const SCRYPT_PARAMS: ScryptParameters = {
  N: 32768,
  r: 8,
  p: 2
}
