##w3name-action

<p align="center">
  <a href="https://github.com/actions/w3name-action/actions"><img alt="w3name-action status" src="https://github.com/pawanpaudel93/w3name-action/workflows/build-test/badge.svg"></a>
</p>

Publish IPNS name using w3name service.


## Usage
Add a w3name-publish.ymlpath `.github/workflows/w3name-publish.yml`
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
````
