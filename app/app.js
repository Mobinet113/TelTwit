import tweet from './twitter/tweet';
import { app } from './telegram/init';
import login from './telegram/login';
import chalk from 'chalk';
import { getChat, chatHistory, searchUsers } from './telegram/chat-history';
import { settings } from './config/telegram';
import { twitterSettings } from './config/twitter';
import { slackMessage } from './slack/slackMessage';
import { slackSettings } from './config/slack';

let user;
let targetUserDetails;
let usersArray = [];

init();

async function init(){

  // Sign in if required
  if ( ! (await app.storage.get('signedin') ) ) {
    user = await login();
  } else {
    console.log( chalk.blue( "Already logged into Telegram" ) );
  }

  // Get our target chat group
  const chat = await getChat();

  // Get our target user from that chat group
  let targetUserID = await getUserIDs();

  console.log("Target User Details: ", targetUserID);

  // Get and process the message history
  let offset = await lastMsgId();
  console.log(chalk.red("Last Message ID: " + offset ));

  let messageHistory = await chatHistory(chat, targetUserID, offset);

  if ( messageHistory.length > 0 ) {
    await processMessageHistory(messageHistory);
  } else {
    console.log( chalk.red( "No messages to process" ) );
  }

}

async function getUserIDs(){

  // If we need to process an array of users deliminated by commas
  if (settings.targetUsername.indexOf(',') > -1) {

    let userNames = settings.targetUsername.split(',');

    const usersIdMap = userNames.map( async ( name ) => {

      console.log( chalk.blue( "Getting User ID for " + name ) );
      targetUserDetails = await searchUsers(name);

      console.log( "ID: " + targetUserDetails.users[0].id );
      usersArray[targetUserDetails.users[0].id] = name;

      return {username: name, id: targetUserDetails.users[0].id};

    });

    return await Promise.all(usersIdMap);

  } else { // Or Return just a single ID if required
    const targetUserDetails = await searchUsers(settings.targetUsername);
    return targetUserDetails.users[0].id;
  }

}

async function processMessageHistory(messages) {

  console.log( chalk.blue( "Processing Telegram Messages" ) );

  let lastMessageId = await lastMsgId();

  const compiledMessages = await Promise.all(messages.map( async message => {

    let text = message.message;
    let id   = message.id;
    let date = message.date;
    let name = usersArray[message.from_id];

    if ( typeof lastMessageId === 'undefined' || id > lastMessageId ) {

      if ( twitterSettings.enable ) {
        tweet(text);
      }

      app.storage.set('lastMessageId', id);
    }

    return {
      text  : text,
      id    : id,
      date  : date,
      name  : name
    };
  }));

  if ( slackSettings.enable ) {
    await slackMessage(compiledMessages);
  }

}

const lastMsgId = async () => {
  let lastMsgId = await app.storage.get('lastMessageId');

  if ( typeof lastMsgId === 'undefined' ){
    await app.storage.get('lastMessageId', 0);
    lastMsgId = 0;
  }

  return lastMsgId;
};
