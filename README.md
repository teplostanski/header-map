# header-map

`getHeader`, `hasHeader`, and `normalizeHeaders` for plain `Record<string, string>` maps.

## Install

`npm install @teplostanski/header-map` also works.


```bash
pnpm add @teplostanski/header-map
```

## API

```ts
import { getHeader, hasHeader, normalizeHeaders } from "@teplostanski/header-map";

getHeader(req.headers, "cf-device-type");
hasHeader(req.headers, "x-request-id");
normalizeHeaders(raw);
```

Not a `Headers` polyfill — just the three helpers I reach for in scripts.

## License

MIT — see [LICENSE](LICENSE).
