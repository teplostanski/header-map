import { buildParsedHeaders } from './build.js'
import { fieldsFromRecord } from './from-record.js'
import type { HeaderInput, HeaderRecord, ParsedHeaders } from './types.js'

const isParsedHeaders = (input: HeaderInput): input is ParsedHeaders =>
  typeof input === 'object'
  && input !== null
  && 'fields' in input
  && 'map' in input
  && 'multi' in input

/** Parse a plain header record into a structured map/AST. */
export const parseHeaders = (input: HeaderInput): ParsedHeaders => {
  if (isParsedHeaders(input)) return input
  if (typeof input === 'string') {
    throw new Error('raw header parsing is not implemented yet')
  }
  if (typeof input === 'object' && input !== null && 'forEach' in input) {
    throw new Error('Headers-like parsing is not implemented yet')
  }
  return buildParsedHeaders(fieldsFromRecord(input as HeaderRecord))
}
