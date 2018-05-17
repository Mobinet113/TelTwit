# TelTwit

TelTwit Announcer simply hooks into the Telegram API and listens for channel messages from a specific list of users to
Tweet or send Slack messages.

## Setup

1. `npm install`
2. `npm run build` to create the .env file and the compile JS
3. Edit the .env file with required API keys, and your Telegram account phone number (Settings explained below)
4. `npm run start`

After running, you should receive an authorisation code on the phone number you provided.

### Using Twitter
To enable the auto posting of tweets from Telegram messages:
1. Go to /app/config/twitter.js
2. Set `enable=true`
3. `npm run setup`

### Using Slack
To enable Slack messaging from Telegram messages:
1. Go to /app/config/slack.js
2. Set `enable=true`
3. `npm run setup`

## Environment Variables (.env)

You will need to setup a .env file in the root directory with secret keys. The required variables are as follows:

##### Telegram Details (Required)
`TELEGRAM_API_ID=` (required) Your Telegram App API ID\
`TELEGRAM_API_HASH=` (required) Your Telegram App hash\
`TELEGRAM_USERNAME=MyUsername` Your own Telegram username\
`TELEGRAM_TARGET_USERNAME=username1,username2` The usernames of people you want to grab messages from, seperated only by commas\
`PHONE_NUMBER=` The phone number belonging to your Telegram Account including country code (+44...)\
`FIRST_NAME=John` Your first name if not already registered\
`LAST_NAME=Doe` Your last name if not already registered\

##### Slack API Details
`SLACK_API_ENDPOINT=` The Slack API Endpoint generated here: <https://api.slack.com/>

##### Twitter API Details
`TWITTER_API_KEY=` Twitter API Key\
`TWITTER_API_SECRET=` Twitter API secret\
`TWITTER_ACCESS_TOKEN_KEY=` Twitter Access key\
`TWITTER_ACCESS_TOKEN_SECRET=` Twitter access secret\

## Executing

If this is the first time running TelTwit, you will need to authorise this application from Telegram. When prompted, enter
the Telegram authorisation code you receive via SMS into the command line.

Once the script is authorised, you will be presented with a list of available chats. Input the index number of the chat
you want to collect messages from.
