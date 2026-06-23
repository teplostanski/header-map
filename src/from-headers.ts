import type { HeaderField, HeadersLike } from './types.js'

export const fieldsFromHeadersLike = (headers: HeadersLike): HeaderField[] => {
  const fields: HeaderField[] = []

  headers.forEach((value, name) => {
    const trimmed = value.trim()
    if (trimmed.length === 0) return
    fields.push({
      name,
      canonical: name.toLowerCase(),
      value: trimmed,
    })
  })

  return fields
}
