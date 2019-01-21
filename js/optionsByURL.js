document.addEventListener('DOMContentLoaded', setup);

function setup() {
  restoreOptions();
  listCustomURL();
  document.getElementById('save').addEventListener('click', saveCustomUrl);
}

//TODO create functions to use custom urls

//Saves options to chrome.storage.sync.
function saveCustomUrl() {
  var site_name = document.getElementById('site_name').value;
  var custom_url = document.getElementById('custom_url').value;

  chrome.runtime.sendMessage({msg: "createContextMenu", name: site_name, url: custom_url});
}

//Restores form state using the preferences in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get({
    custom_url: "",
  }, function(items) {
    document.getElementById('custom_url').value = items.custom_url;
  });
}


//List current custom urls
function listCustomURL() {
  chrome.storage.sync.get({
    custom_url
  }, function(result) {
  document.getElementById('custom_url_list').innerHTML = result.custom_url;
  });
}