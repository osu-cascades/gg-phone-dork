// Given a string, extract the ten digits of the phone number.
// Examples:
// extractPhoneNumberDigits("(555)-123-1234") -> 5551231234
// extractPhoneNumberDigits("1 (555)-123-1234") -> 5551231234
function extractPhoneNumberDigits(text) {
    return text.match(/\d/g).join([]);
}

module.exports = extractPhoneNumberDigits;
