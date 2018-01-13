

searchFacebook = function(word) {
    var query = word.selectionText;
    chrome.tabs.create({url: "https://www.facebook.com/search/top/?q=" + query});
};

searchGoogle = function(word) {
    var query = '';
    var variations = createNumberFormats(word);
    variations.forEach( function(phoneNumber, index) {
        query += index === (variations.length - 1) ? '"' + phoneNumber + '"' : '"' + phoneNumber + '"' + ' OR ';
    });
    chrome.tabs.create({url: "https://www.google.com/search?q=" + query });
};

/*
* parse the raw number and create number formats variations
* @param word | string - the number that was selected by the analyst
* @return | array(string) - array of number formats
*/
createNumberFormats = function(word){
    var rawNumber = word.selectionText.replace(/\D/g,'');
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

searchAll = function(word) {
    searchFacebook(word);
    searchGoogle(word);
    searchTwilio(word);
};

searchTwilio = function(word) {
    // var auth_token = "c6aa4e910117575b29d329b92935ec53";
    // var account_id = "ACc873cd3baba4a0f3e59eaf15a4f4d78d";
    // Set base variables for contacting twilio
    chrome.storage.sync.get({
        twilio_auth_token: null,
        twilio_account_id: null
    }, function(items) {
        query_twilio(word.selectionText, items.twilio_auth_token, items.twilio_account_id);
    });
};


var query_twilio = function(phone_number, auth_token, account_id){
    // Build the URL
    var url  = "https://" + account_id + ":" + auth_token + "@";
    url      += "lookups.twilio.com/v1/PhoneNumbers/"
    url      += "+1" + phone_number.replace("(",'').replace(")",'').replace("-",'');
    url      += "?Type=carrier&Type=caller-name"; 
    chrome.tabs.create({url:url});
    /**
    * TODO: Make an HTTP request her and put response information in a pop up window?
    */
    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", url, true);
    // xhr.onreadystatechange = function() {
    //     console.log(xhr);
    //     if (xhr.readyState == 4) {
    //         // WARNING! Might be injecting a malicious script!
    //         console.log(xhr.responseText);
        
    //     }
    //   chrome.tabs.create({url: "https://www.facebook.com/search/top/?q=" + JSON.stringify(xhr.responseText)});
    // }
    // xhr.send();
}

chrome.contextMenus.create({
    title: "Search in Twilio",
    contexts:["selection"],  // ContextType
    onclick: searchTwilio // A callback function
});


chrome.contextMenus.create({
    title: "Search in Facebook",
    contexts:["selection"],  // ContextType
    onclick: searchFacebook // A callback function
});

chrome.contextMenus.create({
    title: "Search in Google",
    contexts:["selection"],  // ContextType
    onclick: searchGoogle // A callback function
});

chrome.contextMenus.create({
    title: "Search All",
    contexts: ["selection"],  // ContextType
    onclick: searchAll // A callback function
});
