import { parseHeaders } from './parse.js'
import type { HeaderInput, ParsedHeaders } from './types.js'

const asParsed = (input: HeaderInput | ParsedHeaders): ParsedHeaders =>
  parseHeaders(input)

/** Case-insensitive single-value get (last value if duplicated). */
export const getHeader = (
  input: HeaderInput,
  name: string,
): string | undefined =>
  asParsed(input).map[name.toLowerCase()]

/** All values for a name, in appearance order. */
export const getHeaderAll = (
  input: HeaderInput,
  name: string,
): readonly string[] =>
  asParsed(input).multi[name.toLowerCase()] ?? []

export const hasHeader = (input: HeaderInput, name: string): boolean =>
  name.toLowerCase() in asParsed(input).map

/**
 * Plain lowercase map — shape that consumers like undevice expect for
 * `headers: Record<string, string>`.
 */
export const toHeaderMap = (input: HeaderInput): Readonly<Record<string, string>> =>
  asParsed(input).map

/** Pick a subset of headers by name (case-insensitive). Missing names omitted. */
export const pickHeaders = (
  input: HeaderInput,
  names: readonly string[],
): Readonly<Record<string, string>> => {
  const map = asParsed(input).map
  const out: Record<string, string> = {}
  for (const name of names) {
    const value = map[name.toLowerCase()]
    if (value !== undefined) out[name.toLowerCase()] = value
  }
  return out
}
