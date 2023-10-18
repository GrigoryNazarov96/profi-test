import generateRandomSequence from "../../src/utils/random_url_generator";

test("generateRandomSequence() returns string", () => {
  const result = generateRandomSequence();
  expect(typeof result).toBe("string");
  expect(result.length).toBeGreaterThan(0);
});

test("generateRandomSequence() generates different strings", () => {
  const result1 = generateRandomSequence();
  const result2 = generateRandomSequence();
  expect(result1).not.toBe(result2);
});
