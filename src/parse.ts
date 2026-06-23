import { buildParsedHeaders } from './build.js'
import { fieldsFromHeadersLike } from './from-headers.js'
import { fieldsFromRecord } from './from-record.js'
import { parseRawHeaders } from './parse-raw.js'
import type { HeaderInput, HeaderRecord, HeadersLike, ParsedHeaders } from './types.js'

const isParsedHeaders = (input: HeaderInput): input is ParsedHeaders =>
  typeof input === 'object'
  && input !== null
  && 'fields' in input
  && 'map' in input
  && 'multi' in input

const isHeadersLike = (input: object): input is HeadersLike =>
  'forEach' in input && typeof (input as HeadersLike).forEach === 'function'

const pairsFromIterable = (
  input: Iterable<readonly [string, string]>,
) =>
  [...input]
    .map(([name, value]) => ({
      name,
      canonical: name.toLowerCase(),
      value: value.trim(),
    }))
    .filter((field) => field.name.length > 0 && field.value.length > 0)

/**
 * Parse headers from a raw block, a plain record, a Fetch `Headers`-like
 * object, or an iterable of `[name, value]` pairs into a structured map/AST.
 *
 * Pure: does not read ambient request state.
 */
export const parseHeaders = (input: HeaderInput): ParsedHeaders => {
  if (typeof input === 'string') {
    return buildParsedHeaders(parseRawHeaders(input))
  }

  if (isParsedHeaders(input)) {
    return input
  }

  if (Array.isArray(input)) {
    return buildParsedHeaders(pairsFromIterable(input))
  }

  if (isHeadersLike(input)) {
    return buildParsedHeaders(fieldsFromHeadersLike(input))
  }

  if (Symbol.iterator in input) {
    return buildParsedHeaders(
      pairsFromIterable(input as Iterable<readonly [string, string]>),
    )
  }

  return buildParsedHeaders(fieldsFromRecord(input as HeaderRecord))
}
