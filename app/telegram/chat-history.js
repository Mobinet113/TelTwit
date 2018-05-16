const { pluck } = require('ramda');
const { inputField } = require('./fixtures');
import { telegram } from './init';
import chalk from 'chalk';

const getChat = async () => {
  const dialogs = await telegram('messages.getDialogs', {
    limit: 50,
  });

  const { chats } = dialogs;

  const selectedChat = await selectChat(chats);

  return selectedChat
};

/**
 *
 * @param chat
 * @param userID
 * @param offset
 * @param limit
 * @returns {Promise<Array>}
 */
const chatHistory = async ( chat, userID = 0, offset = 0, limit = 100 ) => {
  const max = 400;
  let full = [],
    messages = [];

  do {
    const history = await telegram('messages.getHistory', {
      peer: {
        _          : 'inputPeerChannel',
        channel_id : chat.id,
        access_hash: chat.access_hash
      },
      max_id: offset,
      offset: -full.length,
      limit
    });

    messages = history.messages.filter(filterLastDay);

    // If a userID is provided, then we'll filter for messages from them
    console.log("ID Type: " + typeof userID);

    if ( typeof userID === 'object') {
      console.log( chalk.blue( "Object of User IDs provided" ) );

      // Construct an array of user IDs only
      const usersIdArray = await Promise.all(userID.map( async ( user ) => {
        return user.id;
      }));

      // Check if the message is from a target user
      messages = await messages.filter( message => {
        return usersIdArray.indexOf(message.from_id) > -1;
      });


    } else if (userID > 0 ) {
      console.log( chalk.blue( "User ID provided. Checking messages from " + userID ) );
      messages = messages.filter(message => message.from_id === userID);
    }

    full = full.concat(messages);
    messages.length > 0 && (offset = messages[0].id);
    messages.length > 0 && console.log(offset, messages[0].id)

  } while (messages.length === limit && full.length < max);

  return full
};

const filterLastDay = ({ date }) => new Date(date*1e3) > dayRange();

const dayRange = () => Date.now() - new Date(86400000*4);

const selectChat = async (chats) => {
  const chatNames = pluck('title', chats);

  console.log( chalk.black.bgYellow( 'Your chat list' ) );
  chatNames.map((name, id) => console.log(`${id}  ${name}`));

  console.log( chalk.yellow( 'Select chat by index') );
  const chatIndex = await inputField('index');

  return chats[+chatIndex]
};

const searchUsers = async (username) => {
  const results = await telegram('contacts.search', {
    q    : username,
    limit: 100,
  });

  return results
};

module.exports = {
  getChat,
  chatHistory,
  searchUsers
};