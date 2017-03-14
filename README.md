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

Our commit logs are [Commitizen-friendly](https://commitizen.github.io/cz-cli/). With Commitizen, the header of every commit message has to include a `type`, an optional `scope` and a `subject` with the following format:

```
<type>(<scope>): <subject>
```

You can use one of the following methods to use Commitizen.

**Option 1:** Install Commitizen by running `npm install -g commitizen`, and run `git cz` instead of `git commit` when you want to commit. Follow the instructions on the next screen.

**Option 2:** When you run `npm install` the core `commitizen` library is also saved as `devDependencies`. You can simply run `npm run commit` instead of `git commit` to enable Commitizen. Follow the instructions on the next screen.

**Option 3:** Manually typing the commits altogether. We use the following Commitizen tags.

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning on the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug or adds a feature
- perf: A code change that improves performance
- test: Adding missing tests
- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
- revert: Reverts a previous commit
