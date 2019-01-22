searchAll = function(selection) {
    if( !isValidSelection(selection) ){ return; }
    searchGoogle(selection);
    searchTwilio(selection);
};

searchGoogle = function(selection) {
    if( !isValidSelection(selection) ){ return; }
    var num = extractPhoneNumberDigits(selection.selectionText);
    var query = '';
    var variations = createNumberFormats(num);
    variations.forEach( function(phoneNumber, index) {
        query += index === (variations.length - 1) ? '"' + phoneNumber + '"' : '"' + phoneNumber + '"' + ' OR ';
    });
    chrome.tabs.create({url: "https://www.google.com/search?q=" + query });
};

searchTwilio = function(selection) {
    if( !isValidSelection(selection) ){ return; }
    var num = extractPhoneNumberDigits(selection.selectionText);
    chrome.storage.sync.get({
        twilio_auth_token: null,
        twilio_account_id: null
    }, function(items) {
        query_twilio(num, items.twilio_auth_token, items.twilio_account_id);
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

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.msg == "createContextMenu" ) {
            createContextMenu(request.name, request.url)
        } else if ( request.msg == "removeContextMenu" ) {
            removeContextMenu(request.id)
        }
    }
)

createContextMenu = function(name, custom_url) {
    var id = chrome.contextMenus.create({
        title: "Search " + name,
        contexts: ["selection"],
        onclick: function(selection) {
            if( !isValidSelection(selection) ){ return; }
            var num = extractPhoneNumberDigits(selection.selectionText);
            chrome.tabs.create({url: custom_url + num});
        }
    });

    var new_url = {}
    new_url[id] = name

    chrome.storage.sync.get({custom_urls: []}, function(result) {
        var urls = result.custom_urls;
        urls.push(new_url);
        chrome.storage.sync.set({custom_urls: urls});
    })
    
}

removeContextMenu = function(id) {
    //chrome.contextMenus.remove(id);
}

checkCustomUrls = function() {
    chrome.storage.sync.get('custom_urls', function(data) {
        if( typeof data.custom_urls === 'undefined') {
            chrome.storage.sync.set({custom_urls: {}});
        }
    })
}

chrome.contextMenus.create({
    title: "Search All",
    contexts: ["selection"],  // ContextType
    onclick: searchAll // A callback function
});

chrome.contextMenus.create({
    title: "Search in Twilio",
    contexts:["selection"],  // ContextType
    onclick: searchTwilio // A callback function
});

chrome.contextMenus.create({
    title: "Search in Google",
    contexts:["selection"],  // ContextType
    onclick: searchGoogle // A callback function
});