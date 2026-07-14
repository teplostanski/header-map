# header-map

Parse HTTP headers into a small AST and lowercase maps.

Built as a low-level precursor to device-signal work: normalize whatever the
runtime gives you (`Record`, Fetch `Headers`, or a raw header block) before
reading CDN hints like `cf-device-type` or `CloudFront-Is-*-Viewer`.

Pure functions. No ambient request state.

## Install

```bash
pnpm add @teplostanski/header-map
```

## Quick start

```ts
import {
  parseHeaders,
  getHeader,
  toHeaderMap,
  pickHeaders,
} from '@teplostanski/header-map'

// From a plain object (Node / edge)
const parsed = parseHeaders(req.headers)

parsed.fields
// [{ name: 'CF-Device-Type', canonical: 'cf-device-type', value: 'mobile' }, ...]

parsed.map['cf-device-type'] // 'mobile'  (last value wins)
parsed.multi['accept']       // all values in order

getHeader(req.headers, 'CloudFront-Is-Mobile-Viewer')

// Shape undevice-style consumers expect
toHeaderMap(req.headers)
// { 'cf-device-type': 'mobile', 'user-agent': '...', ... }

pickHeaders(req.headers, [
  'cf-device-type',
  'cloudfront-is-mobile-viewer',
  'cloudfront-is-tablet-viewer',
  'cloudfront-is-desktop-viewer',
])
```

### Raw header block

```ts
import { parseHeaders } from '@teplostanski/header-map'

const parsed = parseHeaders(`
HTTP/1.1 200 OK
Content-Type: text/html
cf-device-type: tablet

`.trimStart())
```

## API

| Export | Role |
|--------|------|
| `parseHeaders(input)` | Main entry → `{ fields, multi, map }` |
| `parseRawHeaders(raw)` | Raw block → `HeaderField[]` |
| `getHeader(input, name)` | Case-insensitive single value |
| `getHeaderAll(input, name)` | All values for a name |
| `hasHeader(input, name)` | Presence check |
| `toHeaderMap(input)` | `Record<string, string>` (lowercase keys) |
| `pickHeaders(input, names)` | Subset map |

`input` may be a `string`, a `Record`, a Fetch `Headers`, an iterable of
`[name, value]` pairs, or an already parsed result.

## Non-goals

- Device / bot detection (see `undevice`)
- Full HTTP message parsing (body, trailers as a stream)
- Cookie jar semantics

## License

MIT — see [LICENSE](LICENSE).
