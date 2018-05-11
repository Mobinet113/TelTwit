import MTProto from "telegram-mtproto";
import { inputField } from './fixtures';


const phone = {
  num : '+447477693606',
  code: '73281'
};

const api = {
  layer          : 57,
  initConnection : 0x69796de9,
  api_id         : 224240
};

const server = {
  dev: true //We will connect to the test server.
};          //Any empty configurations fields can just not be specified

const client = MTProto({ server, api });

connect();

async function connect(){
  const { phone_code_hash } = await client('auth.sendCode', {
    phone_number  : phone.num,
    current_number: false,
    api_id        : api.api_id,
    api_hash      : 'e2dbbd42f6e8d5db0d4b664bdf0e78db'
  });

  const code = await inputField('code');

  const { user } = await client('auth.signIn', {
    phone_number   : phone.num,
    phone_code_hash: phone_code_hash,
    phone_code     : code
  });

  console.log('signed as ', user)

}


