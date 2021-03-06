interface PasswordTemplate {
  maximum: string[],
  long: string[],
  medium: string[],
  basic: string[],
  short: string[],
  pin: string[]
}

interface PasswordCharacterTemplate {
  V: string,
  C: string,
  v: string,
  c: string,
  A: string,
  a: string,
  n: string,
  o: string,
  x: string
}

export const templates: PasswordTemplate = {
  maximum: [
    'anoxxxxxxxxxxxxxxxxx',
    'axxxxxxxxxxxxxxxxxno'
  ],
  long: [
    'CvcvnoCvcvCvcv',
    'CvcvCvcvnoCvcv',
    'CvcvCvcvCvcvno',
    'CvccnoCvcvCvcv',
    'CvccCvcvnoCvcv',
    'CvccCvcvCvcvno',
    'CvcvnoCvccCvcv',
    'CvcvCvccnoCvcv',
    'CvcvCvccCvcvno',
    'CvcvnoCvcvCvcc',
    'CvcvCvcvnoCvcc',
    'CvcvCvcvCvccno',
    'CvccnoCvccCvcv',
    'CvccCvccnoCvcv',
    'CvccCvccCvcvno',
    'CvcvnoCvccCvcc',
    'CvcvCvccnoCvcc',
    'CvcvCvccCvccno',
    'CvccnoCvcvCvcc',
    'CvccCvcvnoCvcc',
    'CvccCvcvCvccno'
  ],
  medium: [
    'CvcnoCvc',
    'CvcCvcno'
  ],
  basic: [
    'aaanaaan',
    'aannaaan',
    'aaannaaa'
  ],
  short: [
    'Cvcn'
  ],
  pin: [
    'nnnn'
  ]
}

export const templateChars: PasswordCharacterTemplate = {
  V: 'AEIOU',
  C: 'BCDFGHJKLMNPQRSTVWXYZ',
  v: 'aeiou',
  c: 'bcdfghjklmnpqrstvwxyz',
  A: 'AEIOUBCDFGHJKLMNPQRSTVWXYZ',
  a: 'AEIOUaeiouBCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz',
  n: '0123456789',
  o: "@&%?,=[]_:-+*$#!'^~;()/.", // tslint:disable-line
  x: 'AEIOUaeiouBCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz0123456789!@#$%^&*()'
}
