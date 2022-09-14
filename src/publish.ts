// eslint-disable-next-line import/no-unresolved
import * as Name from 'w3name'
import * as core from '@actions/core'
import {loadName, getErrorMessage} from './utils'

export async function publishToW3Name(
  signingKey: string,
  cid: string
): Promise<string> {
  const name = await loadName(signingKey)
  const nextValue = `/ipfs/${cid}`
  try {
    const revision = await Name.resolve(name)
    const nextRevision = await Name.increment(revision, nextValue)
    core.info('Publishing the new w3name revision')
    await Name.publish(nextRevision, name.key)
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    if (errorMessage.includes('record not found')) {
      core.info('Publishing the first w3name revision')
      const revision = await Name.v0(name, nextValue)
      await Name.publish(revision, name.key)
    } else {
      throw error
    }
  }
  return name.toString()
}
