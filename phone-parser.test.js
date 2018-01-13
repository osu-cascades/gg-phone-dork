const {extractPhoneNumberDigits, createNumberFormats} = require('./phone-parser');

describe('extractPhoneNumberDigits', () => {
  test("Extracts 1234567890 from '(123) 456-7890'", () => {
    expect(extractPhoneNumberDigits("(123) 456-7890")).toBe("1234567890");
  });

  test("Extracts 1234567890 from '123-456-7890'", () => {
    expect(extractPhoneNumberDigits("123-456-7890")).toBe("1234567890");
  });

  test("Extracts 1234567890 from '1-123-456-7890'", () => {
    expect(extractPhoneNumberDigits("1-123-456-7890")).toBe("1234567890");
  });

  test("Extracts 1234567890 from '1.123.456.7890'", () => {
    expect(extractPhoneNumberDigits("1.123.456.7890")).toBe("1234567890");
  });

  test("Extracts 1234567890 from '123 456 7890'", () => {
    expect(extractPhoneNumberDigits("123 456 7890")).toBe("1234567890");
  });
});

describe('createNumberFormats', () => {
  test("Returns an array of variations given a string of ten digits", () => {
    expect(createNumberFormats("1234567890")).toEqual([
      "1234567890",
      "(123) 456-7890",
      "(123) 456 7890",
      "123.456.7890",
      "123-456-7890",
      "123 456 7890"
    ]);
  });

});