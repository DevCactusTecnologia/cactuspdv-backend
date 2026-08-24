const test = require("node:test");
const assert = require("node:assert/strict");
const { normalizeBarcode } = require("../src/utils/barcode");

test("keeps barcode as text and preserves leading zeros", () => {
  assert.equal(normalizeBarcode(" 0012345678905 "), "0012345678905");
});

test("converts an empty barcode to null", () => {
  assert.equal(normalizeBarcode("   "), null);
  assert.equal(normalizeBarcode(null), null);
});
