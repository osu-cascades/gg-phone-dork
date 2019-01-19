document.addEventListener('DOMContentLoaded', setup);

function setup() {
  restoreOptions();
  listCustomURL();
  document.getElementById('save').addEventListener('click', saveOptions);
}


//TODO create functions to use custom urls

//Saves options to chrome.storage.sync.
function saveOptions() {
  var user_custom_url = document.getElementById('custom_url').value;
  chrome.storage.sync.set({
    custom_url: user_custom_url,
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Custom URL saved.';
    setTimeout(function() { status.textContent = ''; }, 1000);
  });
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
  document.getElementById('custom_url_list').innerHTML = result.key;
  });
}