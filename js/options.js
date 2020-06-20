document.addEventListener('DOMContentLoaded', setup);

function setup() {
  restoreOptions();
  document.getElementById('save').addEventListener('click', saveOptions);
}

// Saves options to chrome.storage.sync.
function saveOptions() {
  var twilio_account_id = document.getElementById('twilio_account_id').value;
  var twilio_auth_token = document.getElementById('twilio_auth_token').value;
  var hlr_api_username  = document.getElementById('hlr_api_username').value;
  var hlr_api_password  = document.getElementById('hlr_api_password').value;
  chrome.storage.sync.set({
    twilio_account_id: twilio_account_id,
    twilio_auth_token: twilio_auth_token,
    hlr_api_username:  hlr_api_username,
    hlr_api_password:  hlr_api_password,
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() { status.textContent = ''; }, 750);
  });
}

// Restores form state using the preferences in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get({
    twilio_account_id: "",
    twilio_auth_token: "",
    hlr_api_username:  "",
    hlr_api_password: "",
  }, function(items) {
    document.getElementById('twilio_account_id').value = items.twilio_account_id;
    document.getElementById('twilio_auth_token').value = items.twilio_auth_token;
    document.getElementById('hlr_api_username').value  = items.hlr_api_username;
    document.getElementById('hlr_api_password').value  = items.hlr_api_password;
  });
}

