const twitterSettings = {
  enable: false, // Set to true to tweet messages as soon as they are handled.
  api_key       : process.env.TWITTER_API_KEY,
  api_secret    : process.env.TWITTER_API_SECRET,
  access_key    : process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_secret : process.env.TWITTER_ACCESS_TOKEN_SECRET
};

module.exports = {twitterSettings};
