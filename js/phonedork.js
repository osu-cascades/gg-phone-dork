searchAll = function(selection) {
    if( !isValidSelection(selection) ){ return; }
    searchGoogle(selection);
    searchHLR(selection);
    searchTwilio(selection);
    searchSpyTox(selection);
    searchTruePeopleSearch(selection);
    searchFastPeopleSearch(selection);
    searchAdvancedBackgroundChecks(selection);
    searchCyberBackgroundChecks(selection);
    searchThatsThem(selection);
    searchSyncMe(selection);
    searchOkCaller(selection);
};

getExternalUrls = function() {
    var externalSiteList = [];
    externalSiteList.push("https://www.spytox.com/people/search?phone=");
    externalSiteList.push("https://www.truepeoplesearch.com/resultphone?phoneno=");
    externalSiteList.push("https://www.fastpeoplesearch.com/");
    externalSiteList.push("https://www.advancedbackgroundchecks.com/");
    externalSiteList.push("https://www.cyberbackgroundchecks.com/phone/");
    externalSiteList.push("https://thatsthem.com/phone/");
    externalSiteList.push("https://sync.me/search/?number=");
    externalSiteList.push("https://www.okcaller.com/detail.php?number=");
    return externalSiteList;
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

searchSpyTox = function(selection) {
    if( !isValidSelection(selection) ){ return; }
    var num = extractPhoneNumberDigits(selection.selectionText);
    var externalUrl = '';
    var query = '';
    var externalUrls = getExternalUrls();
    var variations   = createNumberFormats(num);
    var phoneNumber  = variations[4]
    var externalSite = externalUrls[0];
    chrome.tabs.create({url: externalSite + phoneNumber });
};

searchTruePeopleSearch = function(selection) {
    if( !isValidSelection(selection) ){ return; }
    var num = extractPhoneNumberDigits(selection.selectionText);
    var externalUrl = '';
    var query = '';
    var externalUrls = getExternalUrls();
    var variations   = createNumberFormats(num);
    var phoneNumber  = variations[0]
    var externalSite = externalUrls[1];
    chrome.tabs.create({url: externalSite + phoneNumber });
};

searchFastPeopleSearch = function(selection) {
    if( !isValidSelection(selection) ){ return; }
    var num = extractPhoneNumberDigits(selection.selectionText);
    var externalUrl = '';
    var query = '';
    var externalUrls = getExternalUrls();
    var variations   = createNumberFormats(num);
    var phoneNumber  = variations[4]
    var externalSite = externalUrls[2];
    chrome.tabs.create({url: externalSite + phoneNumber });
};

searchAdvancedBackgroundChecks = function(selection) {
    if( !isValidSelection(selection) ){ return; }
    var num = extractPhoneNumberDigits(selection.selectionText);
    var externalUrl = '';
    var query = '';
    var externalUrls = getExternalUrls();
    var variations   = createNumberFormats(num);
    var phoneNumber  = variations[4]
    var externalSite = externalUrls[3];
    chrome.tabs.create({url: externalSite + phoneNumber });
};

searchCyberBackgroundChecks = function(selection) {
    if( !isValidSelection(selection) ){ return; }
    var num = extractPhoneNumberDigits(selection.selectionText);
    var externalUrl = '';
    var query = '';
    var externalUrls = getExternalUrls();
    var variations   = createNumberFormats(num);
    var phoneNumber  = variations[4]
    var externalSite = externalUrls[4];
    chrome.tabs.create({url: externalSite + phoneNumber });
};

searchThatsThem = function(selection) {
    if( !isValidSelection(selection) ){ return; }
    var num = extractPhoneNumberDigits(selection.selectionText);
    var externalUrl = '';
    var query = '';
    var externalUrls = getExternalUrls();
    var variations   = createNumberFormats(num);
    var phoneNumber  = variations[4]
    var externalSite = externalUrls[5];
    chrome.tabs.create({url: externalSite + phoneNumber });
};

searchSyncMe = function(selection) {
    if( !isValidSelection(selection) ){ return; }
    var num = extractPhoneNumberDigits(selection.selectionText);
    var externalUrl = '';
    var query = '';
    var externalUrls = getExternalUrls();
    var variations   = createNumberFormats(num);
    var phoneNumber  = variations[4]
    var externalSite = externalUrls[6];
    chrome.tabs.create({url: externalSite + phoneNumber });
};

searchOkCaller = function(selection) {
    if( !isValidSelection(selection) ){ return; }
    var num = extractPhoneNumberDigits(selection.selectionText);
    var externalUrl = '';
    var query = '';
    var externalUrls = getExternalUrls();
    var variations   = createNumberFormats(num);
    var phoneNumber  = variations[4]
    var externalSite = externalUrls[7];
    chrome.tabs.create({url: externalSite + phoneNumber });
};

searchHLR = function(selection) {
    if( !isValidSelection(selection) ){ return; }
    var num = extractPhoneNumberDigits(selection.selectionText);
    chrome.storage.sync.get({
        hlr_api_username: null,
        hlr_api_password: null
    }, function(items) {
        query_hlr(num, items.hlr_api_username, items.hlr_api_password);
    });
};

var query_hlr = function(phone_number, api_username, api_password){
    // Build the URL
    var url  = "https://www.hlr-lookups.com";
    url      += "/api/"
    url      += "?action=submitSyncLookupRequest&msisdn=";
    url      += "+1" + phone_number.replace("(",'').replace(")",'').replace("-",'');
    url      += "&route=IP1";
    url      += "&username="+api_username;
    url      += "&password="+api_password;
    chrome.tabs.create({url:url});
}

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
    new_url[id] = name

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
    title: "Search in HLR",
    contexts:["selection"],  // ContextType
    onclick: searchHLR // A callback function
});

chrome.contextMenus.create({
    title: "Search in Google",
    contexts:["selection"],  // ContextType
    onclick: searchGoogle // A callback function
});

chrome.contextMenus.create({
    title: "Search in SpyTox",
    contexts:["selection"],  // ContextType
    onclick: searchSpyTox // A callback function
});

chrome.contextMenus.create({
    title: "Search in TruePeopleSearch",
    contexts:["selection"],  // ContextType
    onclick: searchTruePeopleSearch // A callback function
});

chrome.contextMenus.create({
    title: "Search in FastPeopleSearch",
    contexts:["selection"],  // ContextType
    onclick: searchFastPeopleSearch // A callback function
});

chrome.contextMenus.create({
    title: "Search in AdvancedBackgroundChecks",
    contexts:["selection"],  // ContextType
    onclick: searchAdvancedBackgroundChecks // A callback function
});

chrome.contextMenus.create({
    title: "Search in CyberBackgroundChecks",
    contexts:["selection"],  // ContextType
    onclick: searchCyberBackgroundChecks // A callback function
});

chrome.contextMenus.create({
    title: "Search in ThatsThem",
    contexts:["selection"],  // ContextType
    onclick: searchThatsThem // A callback function
});

chrome.contextMenus.create({
    title: "Search in SyncMe",
    contexts:["selection"],  // ContextType
    onclick: searchSyncMe // A callback function
});

chrome.contextMenus.create({
    title: "Search in OkCaller",
    contexts:["selection"],  // ContextType
    onclick: searchOkCaller // A callback function
});
