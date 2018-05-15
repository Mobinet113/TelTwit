import { twitterSettings } from '../config/twitter';
import Twitter from 'twitter';
import chalk from 'chalk';

async function tweet(message){

  const client = await new Twitter({
    consumer_key: twitterSettings.api_key,
    consumer_secret: twitterSettings.api_secret,
    access_token_key: twitterSettings.access_key,
    access_token_secret: twitterSettings.access_secret
  });

  console.log( chalk.blue( "Tweeting message: " ) );
  console.log( message );

  client.post('statuses/update', {status: message}, function(error, tweet, response) {
    if (!error) {
      console.log( chalk.green( "Tweet successful!" ) );
    } else {
      console.log( chalk.red( "Twitter error: " + error ));
    }
  });

}

module.exports = tweet;


// derek, ian white, Alastair