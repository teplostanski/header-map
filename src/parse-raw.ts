import type { HeaderField } from './types.js'

/**
 * Parse a raw HTTP header block (CRLF or LF).
 *
 * Accepts an optional status/request line as the first line — it is skipped
 * when it does not contain `:`. Folded legacy lines (leading SP/HTAB) append
 * to the previous value.
 */
export const parseRawHeaders = (raw: string): HeaderField[] => {
  const text = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const lines = text.split('\n')
  const fields: HeaderField[] = []

  for (const line of lines) {
    if (line.length === 0) {
      // End of headers in a full message; ignore trailing body if present.
      break
    }

    if (line.startsWith(' ') || line.startsWith('\t')) {
      const prev = fields.at(-1)
      if (!prev) continue
      const folded = `${prev.value} ${line.trim()}`
      fields[fields.length - 1] = {
        name: prev.name,
        canonical: prev.canonical,
        value: folded,
      }
      continue
    }

    const colon = line.indexOf(':')
    if (colon <= 0) {
      // Request/status line or garbage — skip.
      continue
    }

    const name = line.slice(0, colon).trim()
    if (name.length === 0) continue

    const value = line.slice(colon + 1).trim()
    fields.push({
      name,
      canonical: name.toLowerCase(),
      value,
    })
  }

  return fields
}
