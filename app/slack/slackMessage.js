import {slackSettings} from '../config/slack';
import axios from 'axios';
import chalk from 'chalk';

const slackMessage = async content => {

  console.log( chalk.blue("Preparing Slack message") );

  const message = await prepare(content);
  await dispatch(message);
};

const prepare = async content => {
  let message = '*The latest Telegram messages:*\n';

  const prepMessage = content.map( async ( contentRow ) => {

    if ( contentRow.text.length > 0 ) {

      message += '*Author:* ' + contentRow.name + '\n';
      message += '*Time:* <!date^' + contentRow.date + '^Posted {date} at {time}|Posted last day> \n';
      message += '*Message:*\n';
      message += contentRow.text + '\n';
      message += '\n';

      await console.log(chalk.blue("Row Message:"));
      await console.log(message);

    }

  });

  await Promise.all(prepMessage);

  return message;
};

const dispatch = async message => {
  await console.log( chalk.blue("Dispatching Slack Message") );

  await axios({
    method: 'post',
    url: slackSettings.apiEndpoint,
    data: JSON.stringify({"text": message})

  }).then(function (response) {

    console.log( chalk.green("Slack Message sent!") );

  }).catch(function (error) {
    console.log( chalk.red("Slack API Error:") );
    console.log( chalk.red(error) );
  });
};

module.exports = {
  slackMessage
};