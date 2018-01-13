
searchUrbanDict = function(word) {
    var query = word.selectionText;
    chrome.tabs.create({url: "http://www.urbandictionary.com/define.php?term=" + query});
};

searchFacebook = function(word) {
    var query = word.selectionText;
    chrome.tabs.create({url: "https://www.facebook.com/search/top/?q=" + query});
};

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
