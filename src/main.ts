import * as core from '@actions/core'
import {publishToW3Name} from './publish'
import {baseUrl} from './utils'

async function run(): Promise<void> {
  try {
    const signingKey = core.getInput('signing_key')
    const cid = core.getInput('cid')
    const name = await publishToW3Name(signingKey, cid)
    const url = `${baseUrl}/${name}`
    core.info(url)
    core.setOutput('name', name)
    core.setOutput('url', url)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
