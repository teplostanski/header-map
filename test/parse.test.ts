import { describe, expect, it } from 'vitest'
import { parseHeaders } from '../src/parse.js'

describe('parseHeaders', () => {
  it('builds AST + map + multi from a record', () => {
    const parsed = parseHeaders({
      'Content-Type': 'text/plain',
      'X-Request-Id': 'abc',
      'cf-device-type': 'mobile',
    })

    expect(parsed.map).toEqual({
      'content-type': 'text/plain',
      'x-request-id': 'abc',
      'cf-device-type': 'mobile',
    })
    expect(parsed.fields).toHaveLength(3)
    expect(parsed.fields[0]).toMatchObject({
      name: 'Content-Type',
      canonical: 'content-type',
      value: 'text/plain',
    })
  })

  it('keeps duplicate names in fields/multi; map uses last value', () => {
    const parsed = parseHeaders([
      ['Accept', 'text/html'],
      ['Accept', 'application/json'],
    ])

    expect(parsed.multi.accept).toEqual(['text/html', 'application/json'])
    expect(parsed.map.accept).toBe('application/json')
    expect(parsed.fields).toHaveLength(2)
  })

  it('drops empty and undefined record values', () => {
    const parsed = parseHeaders({
      present: '1',
      empty: '   ',
      missing: undefined,
      nope: null,
    })

    expect(parsed.map).toEqual({ present: '1' })
  })

  it('parses Fetch Headers-like objects', () => {
    const headers = new Headers({
      'CF-Device-Type': 'tablet',
      'User-Agent': 'Amazon CloudFront',
    })

    const parsed = parseHeaders(headers)
    expect(parsed.map['cf-device-type']).toBe('tablet')
    expect(parsed.map['user-agent']).toBe('Amazon CloudFront')
  })

  it('returns the same object when given ParsedHeaders', () => {
    const once = parseHeaders({ a: '1' })
    expect(parseHeaders(once)).toBe(once)
  })
})
