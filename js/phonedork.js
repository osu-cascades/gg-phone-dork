searchAll = function(selection) {
    if( !isValidSelection(selection) ){ return; }
    searchGoogle(selection);
    searchTwilio(selection);

    chrome.storage.sync.get({custom_urls: []}, function(result) {
        var urls = result.custom_urls

        for(var i = 0; i < urls.length; i++) {
            var url = urls[i]

            for(var id in url) {
                searchCustomUrl(url[id][1], selection)
            }
        }
    });
};

searchCustomUrl = function(custom_url, selection) {
    if( !isValidSelection(selection) ){ return; }
    var num = extractPhoneNumberDigits(selection.selectionText);
    chrome.tabs.create({url: custom_url + num});
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
            createContextMenu(request.name, request.url);
        } else if ( request.msg == "removeContextMenu" ) {
            removeContextMenu(request.id);
        }
    }
)

createContextMenu = function(name, custom_url) {
    var id = Math.floor(Date.now() / 1000).toString()
    
    chrome.contextMenus.create({
        id: id,
        title: "Search " + name,
        contexts: ["selection"],
        onclick: function(selection) {
            if( !isValidSelection(selection) ){ return; }
            var num = extractPhoneNumberDigits(selection.selectionText);
            chrome.tabs.create({url: custom_url + num});
        }
    });

    var new_url = {}
    new_url[id] = [name, custom_url]

    chrome.storage.sync.get({custom_urls: []}, function(result) {
        var urls = result.custom_urls;
        urls.push(new_url);
        chrome.storage.sync.set({custom_urls: urls});
    })
}

removeContextMenu = function(id) {
    chrome.contextMenus.remove(id);
    chrome.storage.sync.get({custom_urls: []}, function(result) {
        var urls = result.custom_urls
        var found = false;

        for(var i = 0; i < urls.length; i++) {
            var url = urls[i]

            for(var ctx_id in url) {
                if( ctx_id == id ) {
                    urls.splice(i, 1);
                    found = true;
                }
            }
            if( found ) {
                break;
            }
        }

        chrome.storage.sync.set({custom_urls: urls});
    });
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