const {extractPhoneNumberDigits, createNumberFormats, dasherize} = require('./phone-parser');

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

  test('Returns an empty string when its argument does not contain ten digits', () => {
    expect(dasherize('FAKE')).toBe('');
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
  test('Returns an empty array when its argument is not a ten-digit string', () => {
    expect(createNumberFormats('FAKE')).toEqual([]);
  });
});

describe('dasherize', () => {
  test("Converts 1234567890 to 123-123-1234", () => {
    expect(dasherize("1234567890")).toBe("123-456-7890");
  });
  test('Returns an empty string when its argument is not a ten-digit string', () => {
    expect(dasherize('FAKE')).toBe('');
  });
});
