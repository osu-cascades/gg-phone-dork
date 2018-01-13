
// Given a string, extract the ten digits of the phone number.
// Returns an empty string if the text does not contain ten digits.
// Examples:
// extractPhoneNumberDigits("(555)-123-1234") -> 5551231234
// extractPhoneNumberDigits("1 (555)-123-1234") -> 5551231234
//
// @param text | string - a string containing a phone number
// @return | string - ten digits of the phone number
function extractPhoneNumberDigits(text) {
	var numbers = text.match(/\d/g);
    if (numbers.length < 10) {
        return '';
    } else {
        return numbers.slice(-10).join([]);
    }
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

// Parse the raw number and create number formats variations
// Returns an empty array if digits is not a ten-digit string.
//
// @param digits | string - the number that was selected by the analyst
// @return | array(string) - array of number formats
function createNumberFormats(digits) {
    if (digits.match(/^\d{10}/)) {
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
    } else {
        return [];
    }
};

// Convert a string of ten digits to a dasherized phone number.
// Returns an empty string if digits is not a ten-digit string.
//
// @param digits | string - the number that was selected by the analyst
// @return | string - xxx-xxx-xxxx
function dasherize(digits) {
    if (digits.match(/^\d{10}/)) {
        return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else {
        return '';
    }
}

module.exports = { isValidSelection, extractPhoneNumberDigits, createNumberFormats, dasherize };
