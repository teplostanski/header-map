import { describe, expect, it } from "vitest";
import { getHeader, hasHeader, normalizeHeaders } from "../src/headers.js";

describe("normalizeHeaders", () => {
  it("lowercases keys", () => {
    expect(normalizeHeaders({ "X-Foo": "1" })).toEqual({ "x-foo": "1" });
  });
});

describe("getHeader", () => {
  it("is case-insensitive", () => {
    expect(getHeader({ "content-type": "text/plain" }, "Content-Type")).toBe("text/plain");
  });
});

describe("hasHeader", () => {
  it("returns false when missing", () => {
    expect(hasHeader({}, "etag")).toBe(false);
  });
});
