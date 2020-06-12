chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      
      if (request.type == 'FROM_BACKGROUND_TO_PANEL'){
        const { activeUsers } = request;
        const usersList = document.querySelector('#users');
        activeUsers.forEach(user => {
            const div = document.createElement('div');
            const img = document.createElement('div');
            img.style.backgroundImage = `url('https:${user.avatar})`;
            img.style.backgroundSize = '50px 50px';
            div.appendChild(img);
            div.appendChild(document.createTextNode(user.name));
            usersList.appendChild(div);
        });
      }
  });