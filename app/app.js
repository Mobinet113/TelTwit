import login from './telegram/login';
import tweet from './twitter/tweet';

init();

async function init(){

  tweet('I am a Tweet!');

  //const {user} = await login();

  console.log(user);
  //getChat();

}

async function getChat(){
  console.log('Getting chats');

  const dialogs = await telegram('messages.getDialogs', {
    limit: 50,
  });
  const { chats } = dialogs;

  console.log("All Chats: ", chats);

  const selectedChat = await selectChat(chats);

  console.log("Selected Chat: ", selectedChat);

}


