# node-mpw

[![Build Status](https://travis-ci.org/blvdgroup/node-mpw.svg?branch=master)](https://travis-ci.org/blvdgroup/node-mpw)

> Implementation of [Master Password](https://ssl.masterpasswordapp.com/algorithm.html) for nodejs and browser


## Installation

Requirements:

- Node.js (v4.0.0+)

**Note:** this package uses `scrypt` which is built with `node-gyp` so you might need to compile C code. Blame `node-gyp`.

First, install Node.js, and then open a terminal and run `node -v` and `npm -v` to make sure Node is installed correctly.

Now we can install the package.

```bash
$ npm install --save node-mpw
```

Once it's installed and in your `node_modules` folder, you can now run the script! Here's an example:

```js
import * as mpw from 'node-mpw'

const username = 'username'
const password = 'password'
const site = 'example.com'

const key = mpw.generateKey(username, password)
const generated = mpw.generatePassword(site, key, 1, 'long', 3)
```

## API Reference

### generateKey

`mpw.generateKey(name: string, password: string, version?: string, namespace?: string): Buffer`

Calculate the master key from a user's name and master password.

#### Parameters

- `name: string` The desired username.
- `password: string` The desired master password.
- `version?: string` The algorithm version being used for this process.
- `namespace? string` The namespace used as a salt to calculate the key.

Returns: a key generated from the `scrypt` algorithm.

### generatePassword

`mpw.generatePassword(site: string, key: Buffer, counter?: number, template?: string, version?: number, namespace?: string): string`

Encode a site password using the site's type template.

#### Parameters

- `site: string` The site name. The bare domain name is an ideal choice.
- `key: Buffer` An `scrypt`-hashed key generated from the `generateKey()` function.
- `counter?: number` An integer that can be incremented when the user needs a new password for the site.
- `template?: string` The password template that the user chooses.
- `version?: number` The algorithm version being used for this process.
- `namespace?: string` The namespace used as a salt to calculate the seed.

Returns: the final, generated password.

## Contributing

Issues and Pull Requests are welcome! Please read our [Contributing Guidelines](https://github.com/blvdgroup/guidelines) & [Code of Conduct](CONDUCT.md) beforehand.

### Reading the commit log

We use a few emojis as an identifier on what the commits are. The following commit naming scheme is loosely based on the [Commitizen](https://commitizen.github.io/cz-cli/) commit naming conventions. Feel free to use this standard as well.

- :bulb: (bulb): Working on new features
- :bug: (bug): Bug squashing
- :memo: (memo): Working on documentation
- :dash: (dash): Code style cleanup / linting / dusting / etc.
- :construction: (construction): Large refactors or rewrites
- :wrench: (wrench): Adding missing tests
- :arrow_up: (arrow_up): Version bumps
