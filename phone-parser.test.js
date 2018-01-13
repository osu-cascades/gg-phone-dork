const extractPhoneNumberDigits = require('./phone-parser');

test("Extracts 1234567890 from '(123) 456-7890'", () => {
  expect(extractPhoneNumberDigits("(123) 456-7890")).toBe("1234567890");
});

test("Extracts 1234567890 from '123-456-7890'", () => {
  expect(extractPhoneNumberDigits("123-456-7890")).toBe("1234567890");
});

