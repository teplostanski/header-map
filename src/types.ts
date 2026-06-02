/** One header field-line after parse (AST node). */
export type HeaderField = Readonly<{
  /** Name as observed (casing of the first occurrence kept). */
  name: string
  /** Lowercase name for lookups. */
  canonical: string
  /** Trimmed field value (single line). */
  value: string
}>

/**
 * Structured view of an HTTP header set.
 *
 * - `fields` — ordered AST (duplicates preserved as separate nodes)
 * - `multi` — canonical name → all values in order
 * - `map` — canonical name → last value (handy for single-value CDN headers)
 */
export type ParsedHeaders = Readonly<{
  fields: readonly HeaderField[]
  multi: Readonly<Record<string, readonly string[]>>
  map: Readonly<Record<string, string>>
}>

/** Minimal subset of the Fetch `Headers` interface. */
export type HeadersLike = {
  forEach: (callback: (value: string, key: string) => void) => void
}

export type HeaderRecord = Readonly<
  Record<string, string | readonly string[] | undefined | null>
>

export type HeaderInput =
  | string
  | HeadersLike
  | HeaderRecord
  | Iterable<readonly [string, string]>
  | ParsedHeaders
