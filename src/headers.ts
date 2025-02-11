export type HeaderMap = Record<string, string | undefined>;

export function normalizeHeaders(headers: HeaderMap): HeaderMap {
  const out: HeaderMap = {};
  for (const [k, v] of Object.entries(headers)) out[k.toLowerCase()] = v;
  return out;
}

export function getHeader(headers: HeaderMap, name: string): string | undefined {
  return normalizeHeaders(headers)[name.toLowerCase()];
}
