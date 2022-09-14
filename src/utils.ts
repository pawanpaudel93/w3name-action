// eslint-disable-next-line import/no-unresolved
import * as Name from 'w3name'

const basePath = 'https://w3s.link/ipns/'

function pad(n: string, width: number, z = '0'): string {
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

function arrayBufferToHexString(buf: Iterable<number>): string {
  const view = new Uint8Array(buf)
  const hex = Array.from(view).map(v => pad(v.toString(16), 2))
  return hex.join('')
}

function hexStringToUint8Array(hexString: string): Uint8Array {
  hexString = hexString.replace(/^0x/, '')
  if (hexString.length % 2 !== 0) {
    // eslint-disable-next-line no-console
    console.log(
      'WARNING: expecting an even number of characters in the hexString'
    )
  }
  const bad = hexString.match(/[G-Z\s]/i)
  if (bad) {
    // eslint-disable-next-line no-console
    console.log('WARNING: found non-hex characters', bad)
  }
  const pairs = hexString.match(/[\dA-F]{2}/gi)
  const integers = (pairs ?? []).map((s: string) => parseInt(s, 16))
  const array = new Uint8Array(integers)
  return array
}

async function loadName(signingKey: string): Promise<Name.WritableName> {
  return await Name.from(hexStringToUint8Array(signingKey))
}

// error parsing
type ErrorWithMessage = {
  message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError))
  }
}

function getErrorMessage(error: unknown): string {
  return toErrorWithMessage(error).message
}

export {
  arrayBufferToHexString,
  loadName,
  hexStringToUint8Array,
  getErrorMessage,
  basePath
}
