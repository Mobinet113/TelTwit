const settings = {
  phone     : process.env.PHONE_NUMBER,
  firstName : process.env.FIRST_NAME,
  lastName  : process.env.LAST_NAME,
  //api_hash  : 'e2dbbd42f6e8d5db0d4b664bdf0e78db',
  api_hash : process.env.TELEGRAM_API_HASH,
  group     : ''
};

const api = {
  layer          : 57,
  initConnection : 0x69796de9,
  api_id         : process.env.TELEGRAM_API_ID
};

const server = {
  dev: true //We will connect to the test server.
};

module.exports = {
  settings,
  api,
  server
};