import isValidCustomSeq from "../../src/utils/custom_seq_validator";

test("isValidCustomSeq() returns true in case of latin letters and numbers", () => {
  const str = "71823jjaskdlaGAYjasdskmndnjs0009091123123";
  const result = isValidCustomSeq(str);
  expect(result).toBe(true);
});

test("isValidCustomSeq() returns false in case of special chars and symbols", () => {
  const str = "sjd_____^&^&999$$@$$!!!";
  const result = isValidCustomSeq(str);
  expect(result).toBe(false);
});
