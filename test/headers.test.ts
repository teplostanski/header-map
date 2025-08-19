import { describe, expect, it } from "vitest";
import { getHeader, hasHeader, normalizeHeaders } from "../src/headers.js";

describe("normalizeHeaders", () => {
  it("lowercases keys", () => {
    expect(normalizeHeaders({ "X-Foo": "1" })).toEqual({ "x-foo": "1"   it("returns true when present", () => {
    expect(hasHeader({ ETag: "abc" }, "etag")).toBe(true);
    it("normalizes mixed-case keys", () => {
    expect(normalizeHeaders({ "X-A": "1", "x-a": "2" })).toEqual({ "x-a": "2" });
  });
});
});

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
