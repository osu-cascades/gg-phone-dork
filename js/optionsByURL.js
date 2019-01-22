document.addEventListener('DOMContentLoaded', setup);

function setup() {
  listCustomURL();
  document.getElementById('save').addEventListener('click', saveOptionsURL);
  document.getElementById("removeButton").addEventListener("click", removeURL);
}

//
function saveCustomUrl() {
  var site_name = document.getElementById('site_name').value;
  var custom_url = document.getElementById('custom_url').value;

  chrome.runtime.sendMessage({msg: "createContextMenu", name: site_name, url: custom_url});
}

//
function removeCustomUrl() {
  chrome.runtime.sendMessage({msg: "removeContextMenu", id: this.value})
}

//List current custom urls
function listCustomURL() {
  chrome.storage.sync.get({custom_urls: []}, function(result) {
      var urls = result.custom_urls;

      for(var i = 0; i < urls.length; i++) {
        var url = urls[i];
        
        for(var id in url) {
          document.getElementById("custom_url_list").innerHTML += '<li><button id="remove" value="' + id + 
          '">Remove</button>  ' + url[id] + '</li>';
        } 
      }
      if( urls.length > 0 ) {
        document.getElementById('remove').addEventListener('click', removeCustomUrl);
      }
    }
  )
}