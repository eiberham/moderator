chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      
      if (request.type == 'FROM_BACKGROUND_TO_PANEL'){
        const { activeUsers } = request;
        const users = document.querySelector('.users');
        activeUsers.forEach(user => {
            const div = document.createElement('div');
            div.setAttribute("class", "user");

            const img = document.createElement('div');
            img.setAttribute("class", "avatar");
            img.style.backgroundImage = user.avatar.includes('no-avatar') ? `url('https://www.curso-ingles.com/assets/no-avatar.gif')` : `url('https:${user.avatar}')`;
            img.style.backgroundSize = 'contain';
            img.style.backgroundRepeat = 'no-repeat';
            img.style.borderRadius = '50%';
            img.style.height = '3rem';
            img.style.width = '3rem';
            div.appendChild(img);

            const info = document.createElement('div');
            info.setAttribute("class", "info");

            const name = document.createElement('span');
            name.setAttribute("class", "name");
            name.innerText = user.name;
            info.append(name);
            div.append(info);

            const tools = document.createElement('div');
            tools.setAttribute("class", "tools");
            const kick = document.createElement('a');
            kick.setAttribute("class", "kick")
            kick.innerText = 'Kick';
            tools.append(kick);
            div.append(tools);
            
            users.appendChild(div);
        });
      }
  });