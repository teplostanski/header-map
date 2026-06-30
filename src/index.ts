export { parseHeaders } from './parse.js'
export { parseRawHeaders } from './parse-raw.js'
export {
  getHeader,
  getHeaderAll,
  hasHeader,
  pickHeaders,
  toHeaderMap,
} from './query.js'

export type {
  HeaderField,
  HeaderInput,
  HeaderRecord,
  HeadersLike,
  ParsedHeaders,
} from './types.js'

/** @deprecated Prefer `toHeaderMap` / `parseHeaders(...).map`. */
export { toHeaderMap as normalizeHeaders } from './query.js'
