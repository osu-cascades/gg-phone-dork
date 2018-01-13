
// Given a string, extract the ten digits of the phone number.
// Examples:
// extractPhoneNumberDigits("(555)-123-1234") -> 5551231234
// extractPhoneNumberDigits("1 (555)-123-1234") -> 5551231234
function extractPhoneNumberDigits(text) {
	return text.match(/\d/g).slice(-10).join([]);
}

/*
* validates the selection text
* the tests are:
* 1) Test to see if the selection is parsable
* 2) Test to see if the selection is 10 digits
* @return boolean
*/
function isValidSelection(selection) {
	var tenDigitNumber;

	try {
	    tenDigitNumber = extractPhoneNumberDigits(selection.selectionText);
	}
	catch(err) {
	    alert('The selection needs to be a number\nYou selected:\n\n' + selection.selectionText);
	    return false;
	}

	var numberTest = /^\d{10}$/;
	if( !numberTest.test(tenDigitNumber) ){
		alert('The selection needs to be a valid phone number\nYou selected:\n\n' + selection.selectionText);
		return false;
	}
    return true;
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

module.exports = { isValidSelection, extractPhoneNumberDigits, createNumberFormats, dasherize };
