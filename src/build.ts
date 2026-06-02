import type { HeaderField, ParsedHeaders } from './types.js'

export const buildParsedHeaders = (fields: readonly HeaderField[]): ParsedHeaders => {
  const multiAcc = new Map<string, string[]>()
  const map: Record<string, string> = {}
  const nameCasing = new Map<string, string>()

  const normalized: HeaderField[] = fields.map((field) => {
    const canonical = field.canonical.toLowerCase()
    if (!nameCasing.has(canonical)) {
      nameCasing.set(canonical, field.name)
    }
    return {
      name: nameCasing.get(canonical) ?? field.name,
      canonical,
      value: field.value,
    }
  })

  for (const field of normalized) {
    const list = multiAcc.get(field.canonical)
    if (list) list.push(field.value)
    else multiAcc.set(field.canonical, [field.value])
    map[field.canonical] = field.value
  }

  const multi: Record<string, readonly string[]> = {}
  for (const [key, values] of multiAcc) {
    multi[key] = values
  }

  return {
    fields: normalized,
    multi,
    map,
  }
}
