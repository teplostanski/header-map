import { describe, expect, it } from 'vitest'
import { parseRawHeaders } from '../src/parse-raw.js'
import { parseHeaders } from '../src/parse.js'

describe('parseRawHeaders', () => {
  it('parses CRLF header blocks and skips the status line', () => {
    const raw = [
      'HTTP/1.1 200 OK',
      'Content-Type: text/html; charset=utf-8',
      'X-Request-Id: req-1',
      'CloudFront-Is-Mobile-Viewer: true',
      '',
      '<html></html>',
    ].join('\r\n')

    const fields = parseRawHeaders(raw)
    expect(fields.map((f) => f.canonical)).toEqual([
      'content-type',
      'x-request-id',
      'cloudfront-is-mobile-viewer',
    ])
    expect(fields[2]?.value).toBe('true')
  })

  it('supports folded continuation lines', () => {
    const raw = 'X-Folded: hello\n world\n'
    const fields = parseRawHeaders(raw)
    expect(fields).toHaveLength(1)
    expect(fields[0]?.value).toBe('hello world')
  })

  it('works through parseHeaders(string)', () => {
    const parsed = parseHeaders('cf-device-type: desktop\n')
    expect(parsed.map['cf-device-type']).toBe('desktop')
  })
})
