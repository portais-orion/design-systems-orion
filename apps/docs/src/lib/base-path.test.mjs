import assert from "node:assert/strict";
import test from "node:test";

import { normalizeBasePath, withBasePathValue } from "./base-path.ts";

test("normalizeBasePath returns an empty base for local development", () => {
  assert.equal(normalizeBasePath(), "");
  assert.equal(normalizeBasePath("/"), "");
});

test("normalizeBasePath adds one leading slash and removes trailing slashes", () => {
  assert.equal(
    normalizeBasePath("design-systems-orion/"),
    "/design-systems-orion",
  );
  assert.equal(
    normalizeBasePath("/design-systems-orion///"),
    "/design-systems-orion",
  );
});

test("withBasePathValue prefixes an internal path exactly once", () => {
  assert.equal(
    withBasePathValue("/docs/button", "/design-systems-orion"),
    "/design-systems-orion/docs/button",
  );
  assert.equal(
    withBasePathValue(
      "/design-systems-orion/docs/button",
      "/design-systems-orion",
    ),
    "/design-systems-orion/docs/button",
  );
});

test("withBasePathValue preserves external and data URLs", () => {
  assert.equal(
    withBasePathValue("https://example.com/docs", "/design-systems-orion"),
    "https://example.com/docs",
  );
  assert.equal(
    withBasePathValue("data:image/png;base64,x", "/design-systems-orion"),
    "data:image/png;base64,x",
  );
});
