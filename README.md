<h1 align="center">w3name-action</h1>
<p align="center">Publish IPNS name using w3name service.</p>

<p align="center">
  <a href="https://github.com/pawanpaudel93/w3name-action/actions"><img alt="w3name-action status" src="https://github.com/pawanpaudel93/w3name-action/workflows/build-test/badge.svg"></a>
</p>

## Example usage

```yaml
name: 'w3-action'
on:
  push:
    branches:
      - main

jobs:
  w3name-publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: w3name publish
        uses: pawanpaudel93/w3name-action@v0.1
        with:
          cid: <cid from previous steps>
          signing_key: ${{  secrets.SIGNING_KEY }}
```

## Inputs

### `cid`

**Required** The IPFS content ID for the directory or file on IPFS.

### `signing_key`

**Required** w3name signing key to publish names.

You can create the `signing_key` by using the following code snippet by installing `w3name` npm package or using [dearwebthree](https://github.com/pawanpaudel93/dearwebthree) npm package.

```js
const fsPromises = require('fs/promises')
const Name = require('w3name')

function pad(n, width, z = '0') {
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

function arrayBufferToHexString(buf) {
  const view = new Uint8Array(buf)
  const hex = Array.from(view).map(v => pad(v.toString(16), 2))
  return hex.join('')
}

;(async () => {
  const name = await Name.create()
  const signingKey = arrayBufferToHexString(name.key.bytes)
  await fsPromises.writeFile(
    'w3name.json',
    JSON.stringify(
      {
        name: name.toString(),
        signingKey
      },
      null,
      2
    )
  )
  console.log(`w3name.json file created.`)
})()
```

## Outputs

### `name`

The IPNS name associated with the `signing_key`
e.g. `k51qzi5uqu5dm09eb5pk1af1622tn7atinj0ynaic685p9pzbinffxlmc9t82j`

### `url`

The IPNS URL of the name.
e.g. `https://w3s.link/ipns/k51qzi5uqu5dm09eb5pk1af1622tn7atinj0ynaic685p9pzbinffxlmc9t82j`


## Author

👤 **Pawan Paudel**

- Github: [@pawanpaudel93](https://github.com/pawanpaudel93)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/pawanpaudel93/w3name-action/issues).

## Show your support

Give a ⭐️ if this project helped you!

Copyright © 2022 [Pawan Paudel](https://github.com/pawanpaudel93).<br />