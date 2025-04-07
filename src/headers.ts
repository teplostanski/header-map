export type HeaderMap = Record<string, string | undefined>;

export function normalizeHeaders(headers: HeaderMap): HeaderMap {
  const out: HeaderMap = {};
  for (const [k, v] of Object.entries(headers)) out[k.toLowerCase()] = v;
  return out;
}

export function getHeader(headers: HeaderMap, name: string): string | undefined {
  const want = name.toLowerCase();
  if (want in headers) return headers[want];
  for (const [k, v] of Object.entries(headers)) {
    if (k.toLowerCase() === want) return v;
  }
  return undefined;
}

export function hasHeader(headers: HeaderMap, name: string): boolean {
  return getHeader(headers, name) !== undefined;
}
