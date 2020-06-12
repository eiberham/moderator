// Communicates with content scripts and devtools page

chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    if(sender.tab){
      if (request.type == 'FROM_CONTENT_SCRIPT_TO_BACKGROUND'){
        //sendResponse({farewell: "goodbye"});
        chrome.runtime.sendMessage({type: 'FROM_BACKGROUND_TO_PANEL', activeUsers: request.activeUsers});
      }
    }
});