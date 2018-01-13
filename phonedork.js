
searchUrbanDict = function(word) {
    var query = word.selectionText;
    chrome.tabs.create({url: "http://www.urbandictionary.com/define.php?term=" + query});
};

searchFacebook = function(word) {
    var query = word.selectionText;
    chrome.tabs.create({url: "https://www.facebook.com/search/top/?q=" + query});
};

searchGoogle = function(number) {
    var query = number.selectionText;
    chrome.tabs.create({url: "https://www.google.com/search?q=" + query}); 
}

searchAll = function(word) {
    var query = word.selectionText;
    chrome.tabs.create({url: "https://www.facebook.com/search/top/?q=" + query});
    chrome.tabs.create({url: "https://www.google.com/search?q=" + query});
}

searchTwilio = function(word) {
    // Set base variables for contacting twilio
    var auth_token = "c6aa4e910117575b29d329b92935ec53";
    var account_id = "ACc873cd3baba4a0f3e59eaf15a4f4d78d";
    var query      = word.selectionText;
    // Builf the URL
    var url  = "https://" + account_id + ":" + auth_token + "@";
    url      += "lookups.twilio.com/v1/PhoneNumbers/"
    url      += "+1" + query.replace("(",'').replace(")",'').replace("-",'');
    url      += "?Type=carrier&Type=caller-name"; 
    query_twilio(url);
};


var query_twilio = function(url){
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
    title: "Search in UrbanDictionary",
    contexts:["selection"],  // ContextType
    onclick: searchUrbanDict // A callback function
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
})
