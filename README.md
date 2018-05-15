# TelTwit Announcer

TelTwit Announcer simply hooks into the Telegram API and listens for channel messages from a specific list of users to
Tweet.

## How to run locally

`npm install`\
`npm run setup` to create the .env file\
Edit the .env file with required API keys, and your Telegram account phone number\
`npm run dev`\

After running, you should receive an authorisation code on the phone number you provided.

## Environment Variables (.env)

You will need to setup a .env file in the root directory with secret keys. The required variables are as follows:

`TELEGRAM_API_ID=` (required) Your Telegram App API ID\
`TELEGRAM_API_HASH=` (required) Your Telegram App hash\

`PHONE_NUMBER=+44` The phone number belonging to your Telegram Account including country code (+44...)\
`FIRST_NAME=John` Your first name if not already registered\
`LAST_NAME=Doe` Your last name if not already registered\

`TWITTER_API_KEY=` (required) Twitter API Key\
`TWITTER_API_SECRET=` (required) Twitter API secret\
`TWITTER_ACCESS_TOKEN_KEY=` (required) Twitter Access key\
`TWITTER_ACCESS_TOKEN_SECRET=` (required) Twitter access secret\