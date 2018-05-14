import { twitterSettings } from '../config/twitter';
import Twitter from 'twitter';

async function tweet(message){

  const client = await new Twitter({
    consumer_key: twitterSettings.api_key,
    consumer_secret: twitterSettings.api_secret,
    access_token_key: twitterSettings.access_key,
    access_token_secret: twitterSettings.access_secret
  });

  client.post('statuses/update', {status: message}, function(error, tweet, response) {
    if (!error) {
      console.log(tweet);
    }
  });

}

module.exports = tweet;