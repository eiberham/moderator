alert("Moderator extension");

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {

      console.log("message delivered");
      setTimeout(function() {
        /* Example: Send data from the page to your Chrome extension */
        document.dispatchEvent(new CustomEvent('usersListRequest', {}));
    }, 0);
    }
  }
);

// inject code into "the other side" to talk back to this side;
const scr = document.createElement('script');
//appending text to a function to convert it's src to string only works in Chrome
scr.textContent = `
  window.chat.currentUser.moderator = true;        
  document.addEventListener('usersListRequest', function(e) {
    // e.detail contains the transferred data (can be anything, ranging
    // from JavaScript objects to strings).
    document.dispatchEvent(new CustomEvent('usersListResponse', {detail: window.chat.activeUsers}));
});
`;
//cram that sucker in 
(document.head || document.documentElement).appendChild(scr);
//and then hide the evidence as much as possible.
scr.parentNode.removeChild(scr);

//now listen for the message
document.addEventListener('usersListResponse', function(e) {
  // e.detail contains the transferred data (can be anything, ranging
  // from JavaScript objects to strings).
  // Do something, for example:
  console.log("usuarios: ", e.detail);
  chrome.runtime.sendMessage({type: 'FROM_CONTENT_SCRIPT_TO_BACKGROUND', activeUsers: e.detail}, function(response) {
    console.log(response.farewell);
  });
});