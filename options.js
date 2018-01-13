// Saves options to chrome.storage.sync.
function save_options() {
  var twilio_account_id = document.getElementById('twilio_account_id').value;
  var twilio_auth_token = document.getElementById('twilio_auth_token').value;
  chrome.storage.sync.set({
    twilio_account_id: twilio_account_id,
    twilio_auth_token: twilio_auth_token
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() { status.textContent = ''; }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    twilio_account_id: "",
    twilio_auth_token: "",
  }, function(items) {
    document.getElementById('twilio_account_id').value = items.twilio_account_id,
    document.getElementById('twilio_auth_token').value = items.twilio_auth_token
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);