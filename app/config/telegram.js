const settings = {
  phone           : process.env.PHONE_NUMBER,
  firstName       : process.env.FIRST_NAME,
  lastName        : process.env.LAST_NAME,
  api_hash        : process.env.TELEGRAM_API_HASH,
  username        : process.env.TELEGRAM_USERNAME,
  targetUsername  : process.env.TELEGRAM_TARGET_USERNAME,
  group           : ''
};

const api = {
  layer          : 57,
  initConnection : 0x69796de9,
  api_id         : Number(process.env.TELEGRAM_API_ID)
};

const server = {
  webogram: true,
  dev: false //We will connect to the test server.
};

module.exports = {
  settings,
  api,
  server
};