import { describe, expect, it } from 'vitest'
import {
  getHeader,
  getHeaderAll,
  hasHeader,
  pickHeaders,
  toHeaderMap,
} from '../src/query.js'

describe('query helpers', () => {
  const sample = {
    'CF-Device-Type': 'mobile',
    'CloudFront-Is-Mobile-Viewer': 'true',
    'X-Empty': '',
  }

  it('getHeader is case-insensitive', () => {
    expect(getHeader(sample, 'cf-device-type')).toBe('mobile')
    expect(getHeader(sample, 'CF-Device-Type')).toBe('mobile')
  })

  it('getHeaderAll returns every value', () => {
    expect(
      getHeaderAll(
        [
          ['Via', '1.1 edge'],
          ['Via', '1.1 origin'],
        ],
        'via',
      ),
    ).toEqual(['1.1 edge', '1.1 origin'])
  })

  it('hasHeader', () => {
    expect(hasHeader(sample, 'cloudfront-is-mobile-viewer')).toBe(true)
    expect(hasHeader(sample, 'x-empty')).toBe(false)
    expect(hasHeader(sample, 'missing')).toBe(false)
  })

  it('toHeaderMap produces undevice-friendly lowercase map', () => {
    expect(toHeaderMap(sample)).toEqual({
      'cf-device-type': 'mobile',
      'cloudfront-is-mobile-viewer': 'true',
    })
  })

  it('pickHeaders selects CDN viewer hints', () => {
    expect(
      pickHeaders(sample, [
        'cf-device-type',
        'CloudFront-Is-Mobile-Viewer',
        'CloudFront-Is-Tablet-Viewer',
      ]),
    ).toEqual({
      'cf-device-type': 'mobile',
      'cloudfront-is-mobile-viewer': 'true',
    })
  })
})
