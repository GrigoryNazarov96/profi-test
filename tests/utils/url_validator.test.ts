import isValidURL from "../../src/utils/url_validator";

test("isValidURL() returns true for valid URL", () => {
  expect(isValidURL("http://www.example.com")).toBe(true);
  expect(isValidURL("https://example.com")).toBe(true);
  expect(isValidURL("www.example.com")).toBe(true);
  expect(isValidURL("example.com")).toBe(true);
  expect(isValidURL("https://subdomain.example.co.uk")).toBe(true);
});

test("isValidURL() returns false for non-valid URL", () => {
  expect(isValidURL("not_a_url")).toBe(false);
  expect(isValidURL("htp://invalid")).toBe(false);
  expect(isValidURL("www.invalid")).toBe(false);
  expect(isValidURL("invalid.")).toBe(false);
  expect(isValidURL("https://.com")).toBe(false);
});
