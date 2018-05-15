import tweet from './twitter/tweet';
import { telegram, app } from './telegram/init';
import login from './telegram/login';

import { getChat, chatHistory, searchUsers } from './telegram/chat-history';
import { getUser } from './telegram/user';
import {settings} from './config/telegram';


let user;

init();

async function init(){

  // Sign in if required
  if ( ! (await app.storage.get('signedin') ) ) {
    user = await login();
  } else {
    console.log("Already logged into Telegram");
  }

  // Get our own user Details and store them locally
  const userDetails = await getUser(settings.username);
  app.storage.set('userDetails', userDetails);
  console.log("Logged in as ", userDetails.first_name);

  // Get our target chat group
  const chat = await getChat();

  // Get our target user from that chat group
  const targetUserDetails = await searchUsers(settings.targetUsername);
  console.log("Target User Details: ", targetUserDetails.users[0].id);

  // Process the message history
  const messageHustory = await chatHistory(chat, targetUserDetails.users[0].id);


}
