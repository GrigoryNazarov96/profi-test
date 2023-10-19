import generateProperURL from "../../src/utils/proper_url_generator";

test("generateProperURL() adds https://", () => {
  const str = "profi.ru";
  const result = generateProperURL(str);
  expect(typeof result).toBe("string");
  expect(result.startsWith("https://")).toBe(true);
});
