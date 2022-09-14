import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import fs from 'fs'
import {expect, test} from '@jest/globals'

const cid = 'bafybeid4t4bqrnzzeiujyqhxho6wpxx7jhnwhmiraridaubvl4fxkoc4ye'

const {signingKey} = JSON.parse(fs.readFileSync('./w3name.json').toString())

// // shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_CID'] = cid
  process.env['INPUT_SIGNING_KEY'] = signingKey
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  const output = cp.execFileSync(np, [ip], options).toString()
  expect(output).toEqual(`Publishing the new w3name revision
https://w3s.link/ipns/k51qzi5uqu5dji1t4vshma1ohjf7zdpw7iy72tcdo3malrl32zj784zeqeplpf

::set-output name=name::k51qzi5uqu5dji1t4vshma1ohjf7zdpw7iy72tcdo3malrl32zj784zeqeplpf

::set-output name=url::https://w3s.link/ipns/k51qzi5uqu5dji1t4vshma1ohjf7zdpw7iy72tcdo3malrl32zj784zeqeplpf
`)
})
