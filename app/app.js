import MTProto from "telegram-mtproto";

const phone = {
  num : process.env.PHONE_NUMBER,
  code: '9N_yN3Uya4Q'
};

const api = {
  layer          : 57,
  initConnection : 0x69796de9,
  api_id         : process.env.TELEGRAM_API_ID
};


const server = {
  dev: true //We will connect to the test server.
};          //Any empty configurations fields can just not be specified

const client = MTProto({ server, api });

async function connect(){
  const { phone_code_hash } = await client('auth.sendCode', {
    phone_number  : phone.num,
    current_number: false,
    api_id        : api.api_id,
    api_hash      : 'fb050b8f6771e15bfda5df2409931569'
  });
  const { user } = await client('auth.signIn', {
    phone_number   : phone.num,
    phone_code_hash: phone_code_hash,
    phone_code     : phone.code
  });

  console.log('signed as ', user)
}

