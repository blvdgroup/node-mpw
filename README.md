# node-mpw

> :key: Implementation of [Master Password](https://ssl.masterpasswordapp.com/algorithm.html) for nodejs and browser


## Installation

```bash
$ npm install --save node-mpw
```

## Usage

```js
import mpw from 'node-mpw'
```

### `mpw.generateKey(name: string, password: string, version?: string, namespace?: string): Buffer`

Calculate the master key from a user's name and master password.

#### Parameters

- `name: string` The desired username.
- `password: string` The desired master password.
- `version?: string` The algorithm version being used for this process.
- `namespace? string` The namespace used as a salt to calculate the key.

Returns: a key generated from the `scrypt` algorithm.

### `generatePassword(site: string, key: Buffer, counter?: number, template?: string, version?: number, namespace?: string): string`

Encode a site password using the site's type template.

#### Parameters

- `site: string` The site name. The bare domain name is an ideal choice.
- `key: Buffer` An `scrypt`-hashed key generated from the `generateKey()` function.
- `counter?: number` An integer that can be incremented when the user needs a new password for the site.
- `template?: string` The password template that the user chooses.
- `version?: number` The algorithm version being used for this process.
- `namespace?: string` The namespace used as a salt to calculate the seed.

Returns: the final, generated password.

## To-Do List

- ~~Clean up code and write documentation~~ **Done!**
- ~~Refine algorithm & public API to make it compatible with [Master Password app](https://ssl.masterpasswordapp.com/).~~ **Done!**
- Publish as npm package

## Contributing

Issues and Pull Requests are welcome! Please read our contributing guidelines & code of conduct beforehand.

### Reading the commit log

We use a few emojis as an identifier on what the commits are. The following commit naming scheme is loosely based on the [Commitizen](https://commitizen.github.io/cz-cli/) commit naming conventions. Feel free to use this standard as well.

- :bulb: (bulb): Working on new features
- :bug: (bug): Bug squashing
- :memo: (memo): Working on documentation
- :dash: (dash): Code style cleanup / linting / dusting / etc.
- :construction: (construction): Large refactors or rewrites
- :wrench: (wrench): Adding missing tests
- :arrow_up: (arrow_up): Version bumps
