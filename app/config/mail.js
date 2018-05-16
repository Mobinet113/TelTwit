const mailSettings = {
  enable     : false,
  service    : process.env.EMAIL_SERVICE,
  user       : process.env.EMAIL_USER,
  password   : process.env.EMAIL_PASSWORD,
  recipients : process.env.EMAIL_RECIPIENTS
};

module.exports = {
  mailSettings
};