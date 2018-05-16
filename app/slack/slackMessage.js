import {slackSettings} from '../config/slack';
import axios from 'axios';
import chalk from 'chalk';

const slackMessage = async content => {

  console.log( chalk.blue("Preparing Slack message") );
  console.log(content);

  const message = await prepare(content);
  await dispatch(message);
};

const prepare = async content => {
  let message = '*The latest Telegram messages:*\n';

  const prepMessage = content.map( async ( contentRow ) => {

    message += '*Author:* ' + contentRow.name + '\n';
    message += '*Time:* <!date^'+ contentRow.date + '^Posted {date} at {time}|Posted last day> \n';
    message += '*Message:*\n';
    message += contentRow.text + '\n';
    message += '\n';

    console.log(message);

  });

  await Promise.all(prepMessage);

  return message;
};

const dispatch = async message => {
  axios({
    method: 'post',
    url: slackSettings.apiEndpoint,
    data: JSON.stringify({"text": message})

  }).then(function (response) {

    console.log( chalk.green("Slack Message sent!") );

  });
};

module.exports = {
  slackMessage
};