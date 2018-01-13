// Given a string, extract the ten digits of the phone number.
// Examples:
// extractPhoneNumberDigits("(555)-123-1234") -> 5551231234
// extractPhoneNumberDigits("1 (555)-123-1234") -> 5551231234
function extractPhoneNumberDigits(text) {
    return text.match(/\d/g).slice(-10).join([]);
}

/*
* Parse the raw number and create number formats variations
* @param digits | string - the number that was selected by the analyst
* @return | array(string) - array of number formats
*/
function createNumberFormats(digits) {
    var rawNumber = digits;
    var variations = [];
    // XXXXXXXXXX
    variations.push( rawNumber );
    // (XXX) XXX-XXXX
    variations.push( rawNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') );
    // (XXX) XXX XXXX
    variations.push( rawNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2 $3') );
    // XXX.XXX.XXXX
    variations.push( rawNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1.$2.$3') );
    // XXX-XXX-XXXX
    variations.push( rawNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') );
    // XXX XXX XXXX
    variations.push( rawNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3') );
    return variations;
};

function dasherize(digits) {
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

module.exports = { extractPhoneNumberDigits, createNumberFormats, dasherize };
