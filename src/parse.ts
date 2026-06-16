import { buildParsedHeaders } from './build.js'
import { fieldsFromRecord } from './from-record.js'
import { parseRawHeaders } from './parse-raw.js'
import type { HeaderInput, HeaderRecord, ParsedHeaders } from './types.js'

const isParsedHeaders = (input: HeaderInput): input is ParsedHeaders =>
  typeof input === 'object'
  && input !== null
  && 'fields' in input
  && 'map' in input
  && 'multi' in input

export const parseHeaders = (input: HeaderInput): ParsedHeaders => {
  if (typeof input === 'string') {
    return buildParsedHeaders(parseRawHeaders(input))
  }
  if (isParsedHeaders(input)) return input
  if (typeof input === 'object' && input !== null && 'forEach' in input) {
    throw new Error('Headers-like parsing is not implemented yet')
  }
  return buildParsedHeaders(fieldsFromRecord(input as HeaderRecord))
}
