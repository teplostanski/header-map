import type { HeaderField, HeaderRecord } from './types.js'

export const fieldsFromRecord = (record: HeaderRecord): HeaderField[] => {
  const fields: HeaderField[] = []

  for (const [name, raw] of Object.entries(record)) {
    if (raw === undefined || raw === null) continue

    const values = Array.isArray(raw) ? raw : [raw]
    for (const item of values) {
      const value = String(item).trim()
      if (value.length === 0) continue
      fields.push({
        name,
        canonical: name.toLowerCase(),
        value,
      })
    }
  }

  return fields
}
